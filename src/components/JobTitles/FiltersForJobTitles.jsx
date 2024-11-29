import { Button, Select, Input, Flex } from '@chakra-ui/react';
import React from 'react';

export default function FiltersForJobTitles({ filter, setFilter, onSearch }) {
    return (
        <div className='flex flex-col gap-5'>
            <Flex gap="5">
            <Input 
                type="text" 
                placeholder="Поиск по названию" 
                value={filter.searchTerm} 
                onChange={(e) => setFilter({ ...filter, searchTerm: e.target.value })} 
            />
            </Flex>
            <Flex gap="5">
                <Input 
                    type="number" 
                    id="minSalary" placeholder="Мин. зарплата" 
                    value={filter.minSalary} 
                    onChange={(e) => setFilter({ ...filter, minSalary: e.target.value })} 
                />
                <Input 
                    type="number" 
                    id="maxSalary"  placeholder="Макс. зарплата" 
                    value={filter.maxSalary} 
                    onChange={(e) => setFilter({ ...filter, maxSalary: e.target.value })} 
                />
            </Flex>
            <div>
                <Select 
                    id="sortBy" 
                    value={filter.orderBy} 
                    onChange={(e) => setFilter({ ...filter, orderBy: e.target.value })}
                >
                    <option value="name">Название</option>
                    <option value="salary">Зарплата</option>
                </Select>
            </div>
            <div>
                <Select 
                    id="sortOrder" 
                    value={filter.sortOrder} 
                    onChange={(e) => setFilter({ ...filter, sortOrder: e.target.value })}
                >
                    <option value="asc">По возрастанию</option>
                    <option value="desc">По убыванию</option>
                </Select>
            </div>
            <Button onClick={onSearch}>Поиск</Button>
        </div>
    );
}