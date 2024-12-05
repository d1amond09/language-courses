import React from 'react';
import { Input, Select, Button } from '@chakra-ui/react';
import { defaultFilters } from './data';

export default function Filters({ filter, setFilter, onSearch, jobTitles }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='flex flex-col gap-5'>
            <Input 
                placeholder="Поиск по фамилии" 
                name="searchTerm"
                value={filter.searchTerm || ""}
                onChange={handleInputChange} 
            />

            <Input 
                placeholder="Образование" 
                name="education"
                value={filter.education || ""}
                onChange={handleInputChange} 
            />


            <Select 
                name="jobTitle" 
                placeholder="Выберите должность"
                value={filter.jobTitleId || ""}
                onChange={handleInputChange}
            >
                {jobTitles.map((jobTitle) => (
                    <option key={jobTitle.Id} value={jobTitle.Id}>
                        {jobTitle.Name}
                    </option>
                ))}
            </Select>

            <Select 
                name="orderBy" 
                value={filter.orderBy} 
                onChange={handleInputChange}
            >
                <option value="name">Название</option>
                <option value="birthDate">День Рождения</option>
                <option value="address">Адрес</option>
                <option value="phone">Телефон</option>
                <option value="passportNumber">Номер пасспорта</option>
                <option value="education">Образование</option>
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