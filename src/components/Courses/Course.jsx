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

export default function Course({ id,
        name, description, tuitionFee, 
        trainingProgram, intensity, 
        availableSeats, groupSize, hours, isAdmin}) {
    return (
        <Card variant={'filled'}>
            <CardHeader>
                <Heading size={'md'}>{name}:</Heading>
                <Heading size={'md'}>{trainingProgram} </Heading>
            </CardHeader>
            <Divider borderColor={'gray'}/>
            <CardBody>
                <Text>Интенсивность:</Text>
                <Text>{intensity}</Text>
                <Text fontWeight="semibold">Часы обучения: {hours}</Text>
                <Text fontWeight="bold">Свободные места: {availableSeats}/{groupSize}</Text>
                <Text>
                    {description}
                </Text>
            </CardBody>
            <Divider borderColor={'gray'}/>
            {
                isAdmin ? (
                <CardFooter>
                    <Heading size={'md'}>{tuitionFee} руб.</Heading>
                    <Link to={`/courses/edit/${id}`}>
                        <Button className='ml-5' size="md" colorScheme="blue" variant="solid" width="full"> Изменить </Button>
                    </Link>
                    <Link to={`/courses/delete/${id}`}>
                        <Button className='ml-10' size="md" colorScheme="red" variant="solid" width="full"> Удалить </Button>
                    </Link>
                </CardFooter>) : ""
            }
        </Card>
    )
}
