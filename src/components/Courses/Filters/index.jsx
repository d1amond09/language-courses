import React from 'react';
import { Input, Select, Button, Flex } from '@chakra-ui/react';
import { defaultFilters } from './data';

export default function Filters({ filter, setFilter, onSearch }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='flex flex-col gap-5'>
            <Input 
                placeholder="Поиск программы обучения" 
                name="searchTrainingProgram"
                value={filter.searchTrainingProgram || ""}
                onChange={handleInputChange} 
            />

            <Input 
                placeholder="Поиск по названию" 
                name="searchTerm"
                value={filter.searchTerm || ""}
                onChange={handleInputChange} 
            />

            <Flex gap="5">
                <Input 
                    placeholder="Мин. часы" 
                    name="minHours"
                    type="number"
                    value={filter.minHours || ""}
                    onChange={handleInputChange}
                />
                <Input 
                    placeholder="Макс. часы"
                    name="maxHours"
                    type="number"
                    value={filter.maxHours || ""}
                    onChange={handleInputChange}
                />
            </Flex>

            <Flex gap="5">
                <Input 
                    placeholder="Мин. стоимость" 
                    name="minTuitionFee"
                    type="number"
                    value={filter.minTuitionFee || ""}
                    onChange={handleInputChange}
                />
                <Input 
                    placeholder="Макс. стоимость" 
                    name="maxTuitionFee"
                    type="number"
                    value={filter.maxTuitionFee || ""}
                    onChange={handleInputChange}
                />
            </Flex>

            <Select 
                name="orderBy" 
                value={filter.orderBy} 
                onChange={handleInputChange}
            >
                <option value="name">Название</option>
                <option value="tuitionFee">Стоимость</option>
                <option value="hours">Часы</option>
            </Select>

            <Select 
                name="sortOrder" 
                value={filter.sortOrder} 
                onChange={handleInputChange}
            >
                <option value="asc">По возрастанию</option>
                <option value="desc">По убыванию</option>
            </Select>

            <Button onClick={onSearch}>
                Поиск
            </Button>

            <Button onClick={() => {
                setFilter(defaultFilters);
                onSearch();
            }}>
                Сбросить фильтры
            </Button>
        </div>
    );
}