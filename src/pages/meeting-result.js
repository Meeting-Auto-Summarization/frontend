import { Container } from "@mui/material";
import { MeetingResultHeader } from "../components/meeting-result/meeting-result-header";
import { ScriptsResultCard } from "../components/meeting-result/scripts-result-card";
import { SummaryResultCard } from "../components/meeting-result/summary-result-card";
import { AppLayout } from "../components/app-layout";
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../utils/context/context';

const MeetingResult = () => {
    const router = useRouter();
    const { mid } = router.query;
    const { isLogin } = useContext(UserContext);

    useEffect(() => {
        if (!isLogin) {
            router.push('/not-login');
        }
    });

    if (!isLogin) {
        return null;
    }

    return (
        <>
            <Container>
                <MeetingResultHeader mid={mid} />
                <ScriptsResultCard mid={mid} />
                <SummaryResultCard />
            </Container>
        </>
    );
};

MeetingResult.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default MeetingResult;
