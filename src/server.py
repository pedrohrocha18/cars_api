from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from uuid import uuid4

app = FastAPI()

class Car(BaseModel):
    id: Optional[str] = None
    fabricante: str
    modelo: str
    valor: float
    ano: int

cars = []

@app.get('/cars')
def show_all_cars():
    if len(cars) == 0:
        return{'Garagem vazia!'}
    else:
        return cars

@app.post('/cars')
def add_car(car: Car):
    car.id = uuid4()
    cars.append(car)
    return{f'O carro {car.modelo} adicionado com sucesso!'}

@app.get('/cars/{car_id}')
def show_car_by_id(car_id: str):
    for car in cars:
        if car_id == car_id:
            return car
        return {"Carro não encontrado!"}

@app.delete('/cars/{car_id}')
def delete_by_id(car_id: str):
    position = -1
    
    for index, car in enumerate(cars):
        if car_id == car_id:
            position = index
            break
    if position != -1:
        cars.pop(position)
        return {"Deletado com sucesso!"}
    else:
        return {"Carro não encontrado!"}