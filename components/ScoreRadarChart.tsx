"use client";

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from "recharts";
import { GreenHomeScore } from "@/lib/types";

interface Props {
  score: GreenHomeScore;
}

export default function ScoreRadarChart({ score }: Props) {
  const data = [
    { subject: "Install Quality", value: score.installationQuality },
    { subject: "Value", value: score.valueForMoney },
    { subject: "Response Time", value: score.responseTime },
    { subject: "Warranty", value: score.warranty },
    { subject: "Certifications", value: score.certifications },
  ];

  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#6b7280" }} />
        <PolarRadiusAxis angle={90} domain={[60, 100]} tick={false} axisLine={false} />
        <Tooltip
          formatter={(value) => [`${value} / 100`, ""]}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
          labelStyle={{ fontWeight: 700, color: "#111827" }}
        />
        <Radar
          dataKey="value"
          stroke="#16a34a"
          fill="#16a34a"
          fillOpacity={0.15}
          strokeWidth={2}
          dot={{ r: 3, fill: "#16a34a" }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
