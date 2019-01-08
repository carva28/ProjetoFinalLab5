import React, { Component } from 'react';
import firebase from "firebase";

var var_admin, var_estaf, var_lavan;

export default class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            clientes: '',
            arrayemail: [],
            arraynomes: [],
            arrayNomeLav: [],
            arrayLatLav: [],
            arrayLongLav: [],
            var_lavan: ''
        }

        firebase.database().ref('Number/var_admin').on('value', (data) => {
            var_admin = data.toJSON().e;
        })

        firebase.database().ref('Number/var_estafeta').on('value', (data) => {
            var_estaf = data.toJSON().d;
        })

        firebase.database().ref('Number/var_lavandarias').on('value', (data) => {
            var_lavan = data.toJSON().g;
            this.setState({
                var_lavan: var_lavan,
            })
        })

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user,
                    isSignedIn: !!user
                })
            } else {
                this.setState({
                    user: null
                });
            }
        })
        this.adminLoop();
    }


    adminLoop = () => {
        this.adminloops = setTimeout(() => {
            for (let lav = 1; lav <= var_lavan; lav++) {
                firebase.database().ref("Coordenadas/Lavandaria" + lav).on('value', (data) => {
                    var nomelav = data.toJSON().nome;
                    var Latlav = data.toJSON().latitude;
                    var Longlav = data.toJSON().longitude;
                    this.state.arrayNomeLav.push(nomelav);
                    this.state.arrayLatLav.push(Latlav);
                    this.state.arrayLongLav.push(Longlav);
                })
            }

            for (let ad = 1; ad <= var_estaf; ad++) {
                firebase.database().ref("Utilizadores/Estafeta/estafeta0" + ad).on('value', (data) => {
                    var email = data.toJSON().emailestafeta;
                    var nome = data.toJSON().nome;

                    this.state.arrayemail.push(email);
                    this.state.arraynomes.push(nome);
                })
            }

            this.mostrarRender();

        }, 1000);

    }

    mostrarRender = () => {
        this.tempo = setTimeout(() => {
            document.getElementById("Carrega").style.display = 'none';
            document.getElementById("CarregaLav").style.display = 'none';

            for (var s = 0; s < this.state.arraynomes.length; s++) {
                document.getElementById("MostraEstafetas").innerHTML += `
                    <li>${this.state.arraynomes[s]}: ${this.state.arrayemail[s]}</li>
                `;
            }            

            for (var b = 0; b < this.state.arrayNomeLav.length; b++) {
                document.getElementById("TabelaLavandarias").innerHTML += `
                    <li>${this.state.arrayNomeLav[s]}</li>
                `;
            }

        }, 800);
    }


    render() {
        return (
            <div id="HomeAdmin">
                <h1>Administrador</h1>
                <p>Olá administrador {firebase.auth().currentUser.displayName}! Aqui pode visualizar os estafetas e lavandarias guardadas na base de dados.</p>

                <div>
                    <h2>Estafetas</h2>
                    <p>Estes são os estafetas associados à sua <i>app</i> washClub.</p>
                    <div id="Carrega">A carregar estafetas...</div>
                    <ul id="MostraEstafetas"></ul>
                </div>

                <div>
                    <h2>Lavandarias</h2>
                    <p>Estes são as lavandarias que constam na base de dados.</p>
                    <div id="CarregaLav">A carregar lavandarias...</div>
                    <ul id='TabelaLavandarias'></ul>
                </div>
            </div>
        );
    }

    click = () => {
        this.props.paraSair();
    }
}
