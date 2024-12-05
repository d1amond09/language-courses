import { Button, Select, Input, Flex } from '@chakra-ui/react';
import React from 'react';
import { defaultFilters } from './data';

export default function Filters({ filter, setFilter, onSearch, courses }) {
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
                    placeholder="Поиск по фамилии" 
                    value={filter.searchTerm} 
                    onChange={handleInputChange} 
                />
            </Flex>
            <Flex gap="5">
                <Input 
                    type="number" 
                    name="minAge" 
                    placeholder="Мин. возраст" 
                    value={filter.minAge} 
                    onChange={handleInputChange} 
                />
                <Input 
                    type="number" 
                    name="maxAge"  
                    placeholder="Макс. возраст" 
                    value={filter.maxAge} 
                    onChange={handleInputChange} 
                />
            </Flex>
            <Flex gap="5">
                <Input 
                    type="date" 
                    name="minBirthDate" 
                    placeholder="Мин. дата рождения" 
                    value={filter.minBirthDate} 
                    onChange={handleInputChange} 
                />
                <Input 
                    type="date" 
                    name="maxBirthDate" 
                    placeholder="Макс. дата рождения" 
                    value={filter.maxBirthDate} 
                    onChange={handleInputChange} 
                />
            </Flex>
            <Select 
                name="course" 
                placeholder="Выберите курс"
                value={filter.course || ""}
                onChange={handleInputChange}
            >
                {courses.map((c) => (
                    <option key={c.Id} value={c.Id}>
                        {c.Name} {c.TrainingProgram}: {c.TuitionFee}
                    </option>
                ))}
            </Select>

            <Select 
                name="orderBy" 
                value={filter.orderBy} 
                onChange={handleInputChange}
            >
                <option value="surname">Фамилия</option>
                <option value="birthDate">День Рождения</option>
                <option value="address">Адрес</option>
                <option value="phone">Телефон</option>
                <option value="passportNumber">Номер паспорта</option>
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