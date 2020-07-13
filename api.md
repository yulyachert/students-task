# Документация к API списка студентов
## Модель Student
```
{
'id': number,
'firstName': string  # Имя пользователя, min=1, max=30, required=True
'lastName': string,  # Фамилия студента,  min=1, max=30, required=True
'rating': number,  #  Рейтинг студента, min=0, max=1000, required=True
}
```

## Методы
### `GET /students`
Возвращает список студентов

Доступна фильтрация по полю `student.name`, и сортировка по полю `student.rating`

#### Ответ:
```
[
    {
        'id': 1
        'firstName': Юля
        'lastName': Чертова
        'rating': 85
    },

    {
        'id': 2
        'firstName': Дима
        'lastName': Ивановский
        'rating': 100
    },
    ...

]
```
### `DELETE /students/:id`
Метод для удаления студента

### `POST /students/create`
Метод для создания студента
#### Запрос:
```
{
'firstName': string  # Имя пользователя, min=1, max=30, required=True
'lastName': string,  # Фамилия студента,  min=1, max=30, required=True
'rating': number,  #  Рейтинг студента, min=0, max=1000, required=True,
}
```