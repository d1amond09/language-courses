import { 
    Card, 
    CardFooter, 
    CardBody, 
    CardHeader, 
    Divider, 
    Heading,
    Text, 
    Button
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function JobTitle({ 
    id, 
    name, 
    salary, 
    responsibilities, 
    requirements,
    isAdmin
}) {
    return (
        <Card variant={'filled'}>
            <CardHeader>
                <Heading size={'md'}>{name}</Heading>
                <Heading fontWeight="semibold" size={'md'}>Зарплата: {salary} руб.</Heading>
            </CardHeader>
            <Divider borderColor={'gray'}/>
            <CardBody>
                <Text fontWeight="bold">Обязанности:</Text>
                <Text>{responsibilities}</Text>
                <Text fontWeight="bold">Требования:</Text>
                <Text>{requirements}</Text>
            </CardBody>
            <Divider borderColor={'gray'}/>
            {
                            isAdmin ? (
                    <CardFooter>
                        <Link to={`/jobtitles/edit/${id}`}>
                            <Button className='ml-5' size="md" colorScheme="blue" variant="solid" width="full"> Изменить </Button>
                        </Link>
                        <Link to={`/jobtitles/delete/${id}`}>
                            <Button className='ml-10' size="md" colorScheme="red" variant="solid" width="full"> Удалить </Button>
                        </Link>
                    </CardFooter>
                ) : ""
            }
        </Card>
    );
}