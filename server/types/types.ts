import { Request} from "express"


interface IUserId extends Request{
    user : string
}

export {IUserId}