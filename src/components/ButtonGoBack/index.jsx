import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function ButtonGoBack(){
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return(
    <Button onClick={goBack} colorScheme="gray" width="40%">
        Назад
    </Button>
  );
}