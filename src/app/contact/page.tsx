import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact | Toolkio',
    description: 'Toolkio 문의 — 피드백·버그 리포트·도구 제안을 보내주세요. Send Toolkio feedback, bug reports, or tool suggestions.',
};

export default function ContactPage() {
    return <ContactClient />;
}
