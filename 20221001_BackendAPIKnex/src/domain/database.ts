import "ts-node/register";
import config from "./knexfile";
import knex, { Knex } from "knex";
import { TB_Perfil } from "./models/TB_Perfil";
import { TB_Usuario } from "./models/TB_Usuario";

export const db: Knex = knex(config);

declare module "knex/types/tables" {
    interface Tables {
        TB_Perfil: TB_Perfil;
        TB_Usuario: TB_Usuario;
    }
}
