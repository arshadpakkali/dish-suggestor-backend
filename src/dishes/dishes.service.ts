import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import * as dishes from './entities/indian_food_data.json';

@Injectable()
export class DishesService {
  create(createDishDto: CreateDishDto) {
    return 'This action adds a new dish';
  }

  findAll() {
    return dishes;
  }

  findOne(id: string) {
    return dishes.filter((x) => x.name === id);
  }

  update(id: string, updateDishDto: UpdateDishDto) {
    return `This action updates a #${id} dish`;
  }

  remove(id: string) {
    return `This action removes a #${id} dish`;
  }
}
