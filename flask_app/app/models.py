from datetime import date, datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import Date, String, Table, Column, ForeignKey, DateTime, Float, Integer, Time


# create base for our models
class Base(DeclarativeBase):
    pass

#Instatiate your SQLAlchemy database:
db = SQLAlchemy(model_class = Base)

class Users(Base):
    __tablename__ = 'users'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(120), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(360), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(500), nullable=False)
    DOB: Mapped[date] = mapped_column(Date, nullable=False)
    is_paid: Mapped[str] = mapped_column(String(1), nullable=False)
    create_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(), nullable=False)
    weight: Mapped[float] = mapped_column(Float, nullable=False)
    height: Mapped[float] = mapped_column(Float, nullable=False)
    goal_weight: Mapped[int] = mapped_column(Integer, nullable=True)
    sex: Mapped[str] = mapped_column(String(10), nullable=False)

    #One to Many relationship from User to WorkoutSessions and One to Many relationship with Meals
    workouts: Mapped[list['WorkoutSessions']] = relationship('WorkoutSessions', back_populates='user')
    meals: Mapped[list['Meals']] = relationship('Meals', back_populates='user')
    
class WorkoutSessions(Base):
    __tablename__ = 'workout_sessions'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    duration: Mapped[datetime.time] = mapped_column(Time, nullable=False)
    workout_type: Mapped[str] = mapped_column(String(120), nullable=False)
    calories_burned: Mapped[int] = mapped_column(Integer, nullable=False)
    create_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    user: Mapped['Users'] = relationship('Users', back_populates='workouts')

meal_food_item = Table(
    'meal_food_item',
    Base.metadata,
    Column('meal_id', Integer, ForeignKey('meals.id'), primary_key=True),
    Column('food_item_id', Integer, ForeignKey('food_items.id'), primary_key=True)
)

class Meals(Base):
    __tablename__ = 'meals'

    id: Mapped[int] = mapped_column(primary_key=True)
    meal_category: Mapped[str] = mapped_column(String(120), nullable=False)
    total_calories: Mapped[int] = mapped_column(Integer, nullable=False)
    create_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    user: Mapped['Users'] = relationship('Users', back_populates='meals')
    food_items: Mapped[list['FoodItems']] = relationship('FoodItems', secondary=meal_food_item, back_populates='meals')

class FoodItems(Base):
    __tablename__ = 'food_items'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    calories: Mapped[int] = mapped_column(Integer, nullable=False)
    serving_size: Mapped[str] = mapped_column(String(120), nullable=False)

    meals: Mapped[list['Meals']] = relationship('Meals', secondary=meal_food_item, back_populates='food_items')
