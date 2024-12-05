import { 
    Card, 
    CardFooter, 
    CardBody, 
    CardHeader, 
    Divider, 
    Heading,
    Text, 
    Flex,
} from '@chakra-ui/react';
import Actions from '../Actions';

export default function Course({course, isAdmin}) {
    return (
        <Card variant={'filled'} size={"sm"} borderRadius={"20px"}>
            <CardHeader>
                <Heading size={'md'}>{course.Name}: </Heading>
                <Heading size={'sm'}>{course.TrainingProgram} </Heading>
            </CardHeader>
            <Divider borderColor={'gray'}/>
            <CardBody>
                <Text>Интенсивность:</Text>
                <Text>{course.Intensity}</Text>
                <Text fontWeight="semibold">Часы обучения: {course.Hours}</Text>
                <Text fontWeight="bold">Свободные места: {course.AvailableSeats}/{course.GroupSize}</Text>
                <Text>
                    {course.Description}
                </Text>
            </CardBody>
            <Divider borderColor={'gray'}/>
            <CardFooter >
                <Heading size={'md'}>{course.TuitionFee} руб.</Heading>
                {
                    isAdmin ? (
                        <Flex width={"fit-content"} ml={"32"} justify={"right"} >
                            <Actions link={"courses"} id={course.Id} />
                        </Flex>
                    ) : ""
                }
                </CardFooter>
        </Card>
    )
}
