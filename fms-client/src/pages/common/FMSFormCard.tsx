import { CardHeader, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useMemo } from 'react';

interface FMSFormCardProps {
    title: string,
    children: React.ReactNode,
}


const FMSFormCard: React.FC<FMSFormCardProps> = ({ children, title }) => {
    const titleData = useMemo(() => title, [title])
    return (
        <Container className='d-flex justify-content-center align-s-center'>
            <Card sx={{ maxWidth: 675 }} className='my-5 shadow-sm border  mx-5'>
                <CardHeader title={titleData} className='text-center' />
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Container>
    );
}

export default FMSFormCard;