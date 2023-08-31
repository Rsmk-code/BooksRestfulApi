import mangoose, {Document,model, Schema} from 'mongoose';

export interface IAuthor extends Document {
    name: string;
}
const AuthorSchema = new Schema<IAuthor>(
    {
    name: { type: String, required: true}
    },
    {
        versionKey: false
    }
)

const Author = model<IAuthor>('Author', AuthorSchema)
export default Author