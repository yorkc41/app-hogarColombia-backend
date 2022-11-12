import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import generatePassword from 'password-generator';
const generador = require ("password-generator");
const cryptojs = require("crypto-js");
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

GeneradorClave(){
  let clave = generador(8,false);
  return clave;
}

CifrarClave(clave:string){
  let claveCifrada = cryptojs.MD5(clave).toString();
  return claveCifrada;

}


}
