import React from 'react';
import { Award, Download, CheckCircle2 } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { USER_CERTIFICATES } from '../../constants/learningData';

export const CertificatesPage: React.FC = () => {
  return (
    <LearningLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-600" />
            <span>Verified Financial Certificates</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Official credentials earned by passing financial literacy roadmaps & assessments.
          </p>
        </div>

        <div className="space-y-4">
          {USER_CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED CREDENTIAL
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    ID: {cert.credentialId}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900">{cert.title}</h3>
                <p className="text-xs text-slate-500 font-medium">Issued on {cert.issueDate}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skillsVerified.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all shrink-0">
                <Download className="w-4 h-4" />
                <span>Download PDF Certificate</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </LearningLayout>
  );
};
