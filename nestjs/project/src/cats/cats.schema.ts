import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaOptions } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

const options: SchemaOptions = {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

@Schema(options)
export class Cat {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop() // default가 required false이므로 지정하지 않음
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: CatDocument) {
  return {
    id: this._id.toString(),
    email: this.email,
    name: this.name,
  };
});
