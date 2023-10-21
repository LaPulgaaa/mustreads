import { atom } from "recoil";

const userFavs=atom({
    key:"userFavs",
    default:[]
});

export default userFavs;