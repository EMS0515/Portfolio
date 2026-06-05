import resumePdf from '../assets/Resume.pdf';
import { NativePdfViewer } from '../components/global/NativePdfViewer';

export default function Resume() {
  return <NativePdfViewer fileUrl={resumePdf} />;
}