import { Button, Select, Input, Flex } from '@chakra-ui/react';
import React from 'react';
import { defaultFilters } from './data';

export default function Filters({ filter, setFilter, onSearch }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='flex flex-col gap-5'>
            <Flex gap="5">
            <Input 
                type="text" 
                name="searchTerm"
                placeholder="Поиск по названию" 
                value={filter.searchTerm || ""} 
                onChange={handleInputChange} 
            />
            </Flex>
            <Flex gap="5">
                <Input 
                    type="number" 
                    name="minSalary" placeholder="Мин. зарплата" 
                    value={filter.minSalary || ""} 
                    onChange={handleInputChange} 
                />
                <Input 
                    type="number" 
                    name="maxSalary"  placeholder="Макс. зарплата" 
                    value={filter.maxSalary || ""} 
                    onChange={handleInputChange} 
                />
            </Flex>
            <div>
                <Select 
                    name="orderBy" 
                    value={filter.orderBy} 
                    onChange={handleInputChange}
                >
                    <option value="name">Название</option>
                    <option value="salary">Зарплата</option>
                </Select>
            </div>
            <div>
                <Select 
                    id="sortOrder" 
                    value={filter.sortOrder} 
                    onChange={handleInputChange}
                >
                    <option value="asc">По возрастанию</option>
                    <option value="desc">По убыванию</option>
                </Select>
            </div>
            <Button onClick={onSearch}>Поиск</Button>

            <Button onClick={() => {
                setFilter(defaultFilters);
                onSearch();
            }}>
                Сбросить фильтры
            </Button>
        </div>
    );
}