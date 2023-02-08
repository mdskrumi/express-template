import { CustomHelpers } from "joi"
import { isValidObjectId } from "mongoose"

export function ObjectIdValidator(value: string, helper: CustomHelpers) {
    if (!isValidObjectId(value)) {
        return helper.message({ 'custom': `Invalid ObjectId ${value}` })
    }
    else {
        return value
    }

}