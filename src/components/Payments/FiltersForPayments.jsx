import React from 'react';
import { Input, Button, Select } from '@chakra-ui/react';

export default function FiltersForPayments({ filter, setFilter, onSearch }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='flex flex-col gap-5'>
            <Input 
                placeholder="Поиск по назначению" 
                name="searchTerm"
                value={filter.searchTerm || ""}
                onChange={handleInputChange} 
            />

            <Input 
                type="number"
                placeholder="Мин. сумма" 
                name="minAmount"
                value={filter.minAmount || ""}
                onChange={handleInputChange} 
            />

            <Input 
                type="number"
                placeholder="Макс. сумма" 
                name="maxAmount"
                value={filter.maxAmount || ""}
                onChange={handleInputChange} 
            />

            <Input 
                type="date"
                name="minDate"
                value={filter.minDate || ""}
                onChange={handleInputChange} 
            />

            <Input 
                type="date"
                name="maxDate"
                value={filter.maxDate || ""}
                onChange={handleInputChange} 
            />

            <Select 
                name="orderBy" 
                value={filter.orderBy} 
                onChange={handleInputChange}
            >
                <option value="date">Дата</option>
                <option value="amount">Сумма</option>
                <option value="purpose">Назначение</option>
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
                setFilter({
                    minAmount: "",
                    maxAmount: "",
                    minDate: "",
                    maxDate: "",
                    searchTerm: "",
                    orderBy: "date",
                    sortOrder: "asc",
                    pageNumber: 1, 
                    pageSize: 10,
                });
                onSearch();
            }}>
                Сбросить фильтры
            </Button>
        </div>
    );
}