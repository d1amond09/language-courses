import { 
    Card, 
    CardFooter, 
    CardBody, 
    CardHeader, 
    Divider, 
    Heading,
    Text, 
} from '@chakra-ui/react';
import Actions from '../Actions';

export default function JobTitle({ 
    jobTitle,
    isAdmin
}) {
    return (
        <Card variant={'filled'}>
            <CardHeader m={0} pb={5}>
                <Heading size={"md"} pb={2}>{jobTitle.Name}</Heading>
                <Heading fontWeight="normal" size={'md'}>Зарплата: <strong>{jobTitle.Salary} руб.</strong></Heading>
            </CardHeader>
            <Divider borderColor={'gray'}/>
            <CardBody m={0} pb={2} pt={2}>
                <Text minH={32}><strong>Обязанности:</strong> {jobTitle.Responsibilities ? jobTitle.Responsibilities : "Не указаны"}</Text>
                <Text minH={32}><strong>Требования:</strong> {jobTitle.Requirements ? jobTitle.Requirements : "Не указаны"}</Text>
            </CardBody>
            {
                isAdmin ? (
                    <>
                        <Divider borderColor={'gray'}/>
                        <CardFooter pb={2} pt={4} >
                            <Actions link={"jobtitles"} id={jobTitle.Id} />
                        </CardFooter>
                    </>
                ) : ""
            }
        </Card>
    );
}