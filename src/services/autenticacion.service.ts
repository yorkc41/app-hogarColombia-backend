import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import generatePassword from 'password-generator';
import { Llaves } from '../config/llaves';
import { Persona } from '../models';
import { PersonaRepository } from '../repositories';
const generador = require ("password-generator");
const cryptojs = require("crypto-js");
const jwt =require('jsonwebtoken')
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepositorio:PersonaRepository
  ) {}

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

IdentificarPersona(usuario: string, clave:string){
  try{
    let p = this.personaRepositorio.findOne({where: {correo: usuario, clave: clave}});
    if(p){
      return p
    }
    return false

  }catch(error) {
   console.log(error)
   return false

  }
}

//generar token con JWTS
GenerarTokenJWT(persona:Persona){
  let token = jwt.sign({
    data:{
      id: persona.id, 
      correo: persona.correo,
      nombre: persona.nombre,
      rol: persona.rol
    }
  },
  Llaves.claveJWT)

  return token
  }


  //validando el  token
  ValidarToken(token:string){
    try {
      let datos = jwt.verify(token, Llaves.claveJWT)
      return datos
    } catch(error){
      console.log(error)
      return false
    }
  }

}
