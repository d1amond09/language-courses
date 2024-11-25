import { 
    Card, 
    CardFooter, 
    CardBody, 
    CardHeader, 
    Divider, 
    Heading,
    Text 
} from '@chakra-ui/react';

export default function Course({
        name, description, tuitionFee, 
        trainingProgram, intensity, 
        availableSeats, groupSize, hours}) {
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
            <CardFooter>
                <Heading size={'md'}>{tuitionFee} руб.</Heading>
            </CardFooter>
        </Card>
    )
}
