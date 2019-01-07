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
            firebase.database().ref("Utilizadores/Normal").on('value', (data) => {
                console.log(data.toJSON().clienteX3NwUpRcD5Reb0ROF54z9MEEkUv2)
                this.setState({
                    clientes: data.toJSON().clienteX3NwUpRcD5Reb0ROF54z9MEEkUv2.cliente
                })

            })
        }, 3000);
    }

    foorInfo = () => {
        for (let show = 0; show <= this.state.var_lavan; show++) {
            document.getElementById('tabelalavandarias').innerHTML += `
                <h6>Nome: ${this.state.arrayNomeLav[show]}</h6>
                <h6>Email: ${this.state.arrayLatLav[show]}</h6>
                <h6>Email: ${this.state.arrayLongLav[show]}</h6>
            `;
        }
    }


    render() {
        return (
            <div>
                <div>
                    <h2>{this.state.clientes}</h2>
                </div>
                <div>
                    <button onClick={() => this.foorInfo()}>his</button>
                    <div id='tabelalavandarias'></div>
                    <h2>Adicionar Lavandarias</h2>
                    Nome:
                <input type="text" value="" />
                    Localização:
                <input type="text" />

                </div>
            </div>
        );
    }

    click = () => {
        this.props.paraSair();
    }
}