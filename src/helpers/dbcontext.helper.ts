import { SchemaFactory } from '@nestjs/mongoose';

//Generic T should be of type class
export function toDbCollection<T>(model: new () => T) {
  return {
    name: model.name,
    schema: SchemaFactory.createForClass(model),
  };
}
