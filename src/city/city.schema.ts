import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseSchemaDecorator } from '../shared/decorators/base_schema.decorator';
import { WEATHER } from '../shared/constants/schema';
import { WeatherDocument } from '../weather/weather.schema';

export type CityDocument = City & Document;

@BaseSchemaDecorator()
export class City {
  @ApiProperty({ description: 'name of the city' })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'the latitude of the city', required: false })
  @Prop({
    required: false,
  })
  @IsOptional()
  @IsString()
  lat?: string;

  @ApiProperty({ description: 'the latitude of the city', required: false })
  @Prop({
    required: false,
  })
  @IsOptional()
  @IsString()
  long?: string;

  // virtual fields
  weather?: Record<string, unknown> | WeatherDocument[];
}

const CitySchema = SchemaFactory.createForClass(City);
CitySchema.virtual('weather', {
  ref: WEATHER,
  autopopulate: true,
  localField: '_id',
  foreignField: 'city',
});

export { CitySchema };
