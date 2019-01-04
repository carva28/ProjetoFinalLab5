import React, { Component } from 'react'
import firebase from "firebase";
import MapaEstafeta from './MapaEstafeta';
var varreserva,varestado;
export default class ClientesReservas extends Component {
    
    constructor(props){
        super(props);
        this.state= {
            nrEncomenda: [],
            mailcliente: [],
            coordLAT: [],
            coordLong: [],
            nrCalcas: [],
            nrCamisas: [],
            nrCamisolas: [],
            nrCasacos: [],
            nrDesporto: [],
            nrInterior: [],
            nrLa: [],
            nrPijama: [],
            nrVestido: [],
            estado: [],
            crdLat:'',
            crdLong:'',
            buscaReserva:'',
            var_reserva:''
        }
        this.distanceRef = React.createRef();
      
    }
    
    componentDidMount(){
        
        firebase.database().ref('Number/var_reserva').on('value', (data) => {
            console.log(data.toJSON().a);
            varreserva = data.toJSON().a;
            this.setState({
                var_reserva:varreserva,
            })
            this.loops(varreserva);
        })

        firebase.database().ref('Number/var_estado').on('value', (data) => {
            console.log(data.toJSON().f);
            varestado = data.toJSON().f;
        })
    }

    loops = (varreserva) => {
        alert('entra')
            for(let est=1;est<varreserva;est++){
                firebase.database().ref("roupa/Encomenda"+est).on('value', (data) => {

                    var nrEncomenda = '#Pedido' + est;
                    this.state.nrEncomenda.push(nrEncomenda);
                    
                    var ecliente = data.toJSON().cliente;
                    this.state.mailcliente.push(ecliente);  

                    var nrLat = data.toJSON().CoordenadaLat;
                    this.state.coordLAT.push(nrLat);

                    var nrLong = data.toJSON().CoordenadaLong;
                    this.state.coordLong.push(nrLong);

                    var nrCalcas = data.toJSON().NrCalças;
                    this.state.nrCalcas.push(nrCalcas);

                    var nrCamisas = data.toJSON().NrCamisas;
                    this.state.nrCamisas.push(nrCamisas);

                    var nrCamisolas = data.toJSON().NrCamisolas;
                    this.state.nrCamisolas.push(nrCamisolas);

                    var nrCasacos = data.toJSON().NrCasacos;
                    this.state.nrCasacos.push(nrCasacos);

                    var nrDesporto = data.toJSON().NrDesporto;
                    this.state.nrDesporto.push(nrDesporto);

                    var nrInterior = data.toJSON().NrInterior;
                    this.state.nrInterior.push(nrInterior);

                    var nrLa = data.toJSON().NrLa;
                    this.state.nrLa.push(nrLa);

                    var nrPijama = data.toJSON().NrPijama;
                    this.state.nrPijama.push(nrPijama);

                    var nrVestido = data.toJSON().NrVestido;
                    this.state.nrVestido.push(nrVestido);

                    var estado = data.toJSON().estado;
                    this.state.estado.push(estado);              

                })
            
                
            }

        this.srh();
    }

    srh = () => {
        this.verifica = setTimeout(() =>{
            
            for(let it=0; it<this.state.nrEncomenda.length; it++){
                
                document.getElementById('selectmain').innerHTML+=`
                    
                    <option value=${it}>${this.state.nrEncomenda[it]}</option>`;   

            }
            
        }, 500);
    } 


    irBuscar = () =>{
            console.log(this.state.buscaReserva); 
            console.log(this.state.var_reserva)         
            for(let est=1;est<this.state.var_reserva;est++){
                let pedido = '#Pedido'+est;
                console.log(pedido)
                    if(pedido == this.state.buscaReserva){
                        firebase.database().ref("roupa/Encomenda"+est).update(
                        { 
                                estado:1,
                                estafeta:firebase.auth().currentUser.displayName,           
                        }
                        );
                        
                    }else{
                    }
                
            }
        
    }
    
  render() {
  
   

    return(
        <div>
             <select value={this.state.value} onChange={this.handleChange} id="selectmain"></select>
             <div id="btn_vou"></div>
            <div id="main_info"></div>
            <div id="roupa"></div>

            <MapaEstafeta 
                    ref={this.distanceRef}
                    currentLatitude={this.props.LatAtual}
                    currentLongitude={this.props.LongAtual}
                    destinationLatitude={this.state.crdLat}
                    destinationLongitude={this.state.crdLong}
            />
            <button onClick={() => this.irBuscar()}id="vou2">Vou</button>
        </div>
    );
        
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
    this.forInfo(event.target.value)
    this.roupaInfo(event.target.value)
  }

  forInfo = (valor) => {
    let destino;

    for(let show=0; show<this.state.mailcliente.length; show++){
        if(valor == show){
            document.getElementById('btn_vou').innerHTML=`
                <button id="vou">Vou</button>
            `;
            document.getElementById('main_info').innerHTML=`
            <div id='clienteInfo'>
                <h4>Nr Encomenda:<h5>${this.state.nrEncomenda[show]}</h5></h4>
                <h4>Cliente:<h6>${this.state.mailcliente[show]}</h6></h4>
                <h4>Estado da encomenda:<h6>${this.state.estado[show]}</h6></h4>
                <h4>Coordenada Lat:<h6>${this.state.coordLAT[show]}</h6></h4>
                <h4>Coordenada Long:<h6>${this.state.coordLong[show]}</h6></h4>
            </div>`;

            // this.irBuscar = (varestado) =>{
            //     //alert(this.state.nrEncomenda[show])
            //     console.log(varestado);
            //     firebase.database().ref("roupa/Encomenda"+est).update('value', (data) => {
            //     // for(let l=varestado;l < varestado+1;l++) {
            
            //     //     firebase.database().ref("EstadoEncomenda/estado"+varestado).set(
            //     //     { 
            //     //         cliente:this.state.mailcliente[show],
            //     //         nrEncomenda:this.state.nrEncomenda,
            //     //         CoordenadaLat:this.state.coordLAT[show],
            //     //         CoordenadaLong:this.state.coordLong[show],
            //     //         estado:1,
            //     //         estafeta:firebase.auth().currentUser.displayName,
            //     //     });
            //     // }
            //     // varestado++;
        
            //     // firebase.database().ref("Number/var_estado").set(
            //     // { 
            //     //     a:varestado,
            //     // })
            
            // }

            this.setState({
                buscaReserva:this.state.nrEncomenda[show],
            })


            this.setState({
                crdLat:this.state.coordLAT[show],
                crdLong:this.state.coordLong[show],
           
            })
            destino = {
                destLatitude: this.state.coordLAT[show],
                destLongitude: this.state.coordLong[show],
            };

            this.setState(destino, () => {
                this.distanceRef.current.renderiza();
            });

            console.log(this.state.crdLat)

            
        }else{

        }
 
    }
    }
    roupaInfo = (valor) => {
        for(let roupa=0; roupa<this.state.nrCamisas.length; roupa++){
            if(valor == roupa){
            document.getElementById('roupa').innerHTML=`
                <div id='roupaInfo'>
                    <h4>Peças:<h5>${this.state.nrCamisas[roupa]}</h5></h4>
                    <h4>Tipo:<h5>${this.state.nrCalcas[roupa]}</h5></h4>
                </div>`;
            }
            // if(valor == roupa){
            //     let totalroupa=this.state.nrCalcas[roupa] +this.state.nrCamisas[roupa] + this.state.nrCamisolas[roupa] + this.state.nrCasacos[roupa] + this.state.nrDesporto[roupa] + this.state.nrInterior[roupa] + this.state.nrLa[roupa] + this.state.nrVestido[roupa] + this.state.nrPijama[roupa];
            //     let veri_completo=[
            //         [this.state.nrCalcas[roupa],'Calças'],
            //         [this.state.nrCamisas[roupa],'Camisas'], 
            //         [this.state.nrCamisolas[roupa],'Camisolas'], 
            //         [this.state.nrCasacos[roupa],'Casacos'], 
            //         [this.state.nrDesporto[roupa],'Desporto'], 
            //         [this.state.nrInterior[roupa],'Interior'],
            //         [this.state.nrLa[roupa],'La'],
            //         [this.state.nrVestido[roupa],'Vestido'], 
            //         [this.state.nrPijama[roupa],'Pijama']
            //     ];
            //     console.log(veri_completo)  

            //         // loop the outer array
            //         for (var i = 0; i < veri_completo.length; i++) {
            //             // get the size of the inner array
            //             var innerArrayLength = veri_completo[i].length;
            //             // loop the inner array
            //             for (var j = 0; j < innerArrayLength; j++) {
            //                 console.log('[' + i + ',' + j + '] = ' + veri_completo[i][j]);
            //                 if(veri_completo[i][j] == 0){
            //                     //alert("non"+veri_completo[i][j] +"nome"+ veri_completo[i][j+1])
            //                 }else{
            //                     //alert("Senhora tonieta"+veri_completo[i][j])
            //                     if("Senhora tonieta"+veri_completo[i][j+1] != null)
            //                     document.getElementById('roupa').innerHTML=`
            //                         <div id='roupaInfo'>
            //                             <h4>Peças:<h5>${veri_completo[i][j]}</h5></h4>
            //                             <h4>Tipo:<h5>${veri_completo[i][j+1]}</h5></h4>
            //                         </div>`;
            //                 }
            //                }
            //             }
            break;
                     
                
               
            // }else{
    
            // }
     
        }
         
    }



}
