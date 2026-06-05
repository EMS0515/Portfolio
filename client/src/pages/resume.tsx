import resumePdf from '../assets/resume.pdf';
import { NativePdfViewer } from '../components/global/NativePdfViewer';

export default function Resume() {
  return <NativePdfViewer fileUrl={resumePdf} />;
}