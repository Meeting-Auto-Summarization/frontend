import { Container } from "@mui/material";
import { MeetingResultHeader } from "../components/result/meeting-result-header";
import { ScriptsResultCard } from "../components/result/scripts-result-card";
import { SummaryResultCard } from "../components/result/summary-result-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { useRouter } from 'next/router';

const MeetingResult = () => {
    const router = useRouter();
    const { mid } = router.query;

    return (
        <>
            <Container>
                <MeetingResultHeader />
                <ScriptsResultCard mid={mid} />
                <SummaryResultCard />
            </Container>
        </>
    );
};

MeetingResult.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default MeetingResult;
