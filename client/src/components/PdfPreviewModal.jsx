import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
    XMarkIcon,
    AcademicCapIcon,
    ChartBarIcon,
    UsersIcon,
} from "@heroicons/react/24/solid";

const foreselogo = "/forese-logo.png";
const svcelogo = "/svce-logo.png";

export default function PdfPreviewModal({ isOpen, onClose, user }) {
    const pdfRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [foreseBase64, setForeseBase64] = useState("");
    const [svceBase64, setSvceBase64] = useState("");

    useEffect(() => {
        if (!isOpen) return;
        const toBase64 = async (url, setter) => {
            const res = await fetch(url);
            const blob = await res.blob();
            const reader = new FileReader();
            reader.onloadend = () => setter(reader.result);
            reader.readAsDataURL(blob);
        };
        toBase64(foreselogo, setForeseBase64);
        toBase64(svcelogo, setSvceBase64);
    }, [isOpen]);

    if (!isOpen || !user) return null;

    const aptitudeScores = {
        aptitude: user.aptitude || 0,
        core: user.core || 0,
        verbal: user.verbal || 0,
        programming: user.programming || 0,
        comprehension: user.comprehension || 0,
    };

    const gdScores = {
        subject_knowledge: user.gd_subject_knowledge || 0,
        communication_skills: user.gd_communication_skills || 0,
        body_language: user.gd_body_language || 0,
        listening_skills: user.gd_listening_skills || 0,
        active_participation: user.gd_active_participation || 0,
    };

    const totalApt = Object.values(aptitudeScores).reduce((a, b) => a + b, 0);
    const totalGD = Object.values(gdScores).reduce((a, b) => a + b, 0);
    const overall = totalApt + totalGD;

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            const canvas = await html2canvas(pdfRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const ratio = pdfWidth / imgProps.width;
            const height = imgProps.height * ratio;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, height);
            pdf.save(`Mock_Report_${user.regno}.pdf`);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-5xl shadow-xl flex flex-col h-[90vh]">

                {/* HEADER */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="font-semibold text-lg">Report Preview</h2>
                    <button onClick={onClose}>
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="bg-gray-100 p-4 overflow-auto flex-1 flex justify-center">
                    <div
                        ref={pdfRef}
                        style={{
                            width: 794,
                            height: 1123,
                            backgroundColor: "#ffffff",
                            padding: "24px 44px",
                        }}
                    >
                        {/* LOGOS (LIFTED UP) */}
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <img src={foreseBase64 || foreselogo} alt="Forese" style={{ height: 70 }} />
                            <img src={svceBase64 || svcelogo} alt="SVCE" style={{ height: 36 }} />
                        </div>

                        {/* TITLE (TIGHTER) */}
                        <div style={{ textAlign: "center", marginBottom: 16 }}>
                            <div
                                style={{
                                    width: 46,
                                    height: 46,
                                    borderRadius: "50%",
                                    backgroundColor: "#eef2ff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 6px",
                                }}
                            >
                                <AcademicCapIcon style={{ width: 24, color: "#4f46e5" }} />
                            </div>
                            <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Mocks ’26</h1>
                            <p style={{ color: "#64748b", marginTop: 2 }}>Performance Overview</p>
                        </div>

                        {/* TABLES */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <Section
                                icon={<ChartBarIcon style={{ width: 18, color: "#6366f1" }} />}
                                title="Aptitude Scores"
                            >
                                <AptitudeCard scores={aptitudeScores} total={totalApt} />
                            </Section>

                            <Section
                                icon={<UsersIcon style={{ width: 18, color: "#6366f1" }} />}
                                title="Group Discussion"
                            >
                                <GDCard scores={gdScores} total={totalGD} />
                            </Section>
                        </div>

                        {/* OVERALL (PULLED UP) */}
                        <div
                            style={{
                                marginTop: 20,
                                backgroundColor: "#4f46e5",
                                color: "white",
                                padding: 20,
                                borderRadius: 14,
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 13, opacity: 0.85 }}>OVERALL PERFORMANCE</div>
                            <div style={{ fontSize: 42, fontWeight: 800 }}>
                                {overall} <span style={{ fontSize: 20 }}>/ 100</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="p-4 border-t flex justify-end gap-3 bg-white rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-semibold shadow-md"
                    >
                        {isGenerating ? "Generating..." : "Download PDF"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ---------- HELPERS ---------- */

function Section({ icon, title, children }) {
    return (
        <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, display: "flex", gap: 8 }}>
                {icon}
                {title}
            </h3>
            {children}
        </div>
    );
}

function AptitudeCard({ scores, total }) {
    const rows = [
        ["Aptitude", scores.aptitude],
        ["Core Knowledge", scores.core],
        ["Verbal Ability", scores.verbal],
        ["Programming Skills", scores.programming],
        ["Comprehension", scores.comprehension],
    ];
    return <ScoreTable header="ASSESSMENT CATEGORY" rows={rows} total={total} />;
}

function GDCard({ scores, total }) {
    const rows = [
        ["Subject Knowledge", scores.subject_knowledge],
        ["Communication Skills", scores.communication_skills],
        ["Body Language", scores.body_language],
        ["Listening Skills", scores.listening_skills],
        ["Active Participation", scores.active_participation],
    ];
    return <ScoreTable header="EVALUATION CRITERIA" rows={rows} total={total} />;
}

function ScoreTable({ header, rows, total }) {
    return (
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: 12, background: "#f8fafc", fontSize: 12, fontWeight: 700 }}>
                <span>{header}</span>
                <span>SCORE</span>
            </div>
            {rows.map(([label, val], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: 12, borderTop: "1px solid #f1f5f9", fontSize: 13 }}>
                    <span>{label}</span>
                    <span style={{ fontWeight: 700 }}>{val} / 10</span>
                </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: 14, background: "#f1f5f9", fontWeight: 800 }}>
                <span>Section Total</span>
                <span>{total} / 50</span>
            </div>
        </div>
    );
}
