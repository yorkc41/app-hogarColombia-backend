import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { Request, RedirectRoute, HttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
//import { ParamsDictionary } from "express-serve-static-core";
//import { ParsedQs } from "qs";
import { AutenticacionService } from "../services";
import  parseBearerToken from 'parse-bearer-token';
export class EstrategiaAdministrador implements AuthenticationStrategy{
    name: string = 'admin'

    constructor(
        @service(AutenticacionService)
        public serviciAutenticacion: AutenticacionService
    ){}


   async authenticate(request: Request): Promise<UserProfile  | undefined> {
        let token = parseBearerToken(request);
        if(token){
            let datos = this.serviciAutenticacion.ValidarToken(token)
            if(datos){
                let perfil: UserProfile = Object.assign({
                    nombre: datos.data.nombre,
                    correo: datos.data.correo,
                    rol: datos.data.r
                })
                return perfil
            }else{
                throw new HttpErrors[401]('token no valido')
            }
        }else{
            throw new HttpErrors[401]('no hay token')
        }
    }   
    
          
    
}