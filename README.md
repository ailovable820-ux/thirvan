# 🌐 THIRVAN

### AI-Powered Labour Market Intelligence & Skill Demand–Supply Forecasting

> **Smart India Hackathon 2026 | SIH26246 | Software**

**THIRVAN — Skills Meet Opportunity** is an AI-powered labour market intelligence prototype designed to help analyse labour-demand signals, explore occupation and skill trends, evaluate baseline forecasts, and identify potential workforce skill gaps when comparable data is available.

It brings together **Labour Market Intelligence, Demand Trend Analysis, Time-Series Forecasting, Skill Intelligence, Workforce Supply Comparability, Training Alignment, Data Quality, and Decision Support** in one unified platform.

🔗 **Live Prototype:** [Open THIRVAN](https://thirvan-labour-marke-yt3w.bolt.host/)  
💻 **GitHub Repository:** [ailovable820-ux/thirvan](https://github.com/ailovable820-ux/thirvan)

---

## 🌍 The Problem

Labour markets evolve continuously as industries adopt new technologies, occupations change, and skill requirements shift.

However, understanding these changes can be difficult when information about job demand, workforce availability, occupations, skills, and training programmes is fragmented across different sources.

Key challenges include:

- Limited visibility into changing labour-demand signals.
- Difficulty identifying occupations and skills with rising demand.
- Challenges forecasting future demand from historical observations.
- Inconsistent definitions and classifications across datasets.
- Difficulty comparing demand with genuinely comparable workforce supply.
- Misalignment between emerging skill requirements and training opportunities.
- Limited transparency around data quality, forecasting performance, and analytical assumptions.
- Time-consuming preparation of reports for planning and decision-making.

The challenge is not just displaying labour-market statistics, but understanding:

> **Which occupations and skills show demand, how might that demand change, where could comparable workforce gaps exist, and how can training align with emerging requirements?**

---

# 💡 Our Solution — THIRVAN

THIRVAN transforms labour-market data into a structured, explainable analytical workflow.

It helps users explore demand trends, evaluate baseline forecasts, compare districts and sectors, and assess potential skill gaps without presenting unsupported conclusions as facts.

### Core Workflow

```text
DATA INPUT
    ↓
DATA VALIDATION & STANDARDISATION
    ↓
LABOUR DEMAND ANALYSIS
    ↓
DEMAND FORECASTING & EVALUATION
    ↓
┌───────────────────────────┐
│                           │
WORKFORCE GAP ANALYSIS   TRAINING ALIGNMENT
│                           │
└───────────────────────────┘
    ↓
DATA-QUALITY & METHODOLOGY REVIEW
    ↓
REPORTS & EXPORTS
    ↓
EVIDENCE-INFORMED DECISION SUPPORT
```

Each analysis depends on the availability and comparability of the underlying data. When evidence is insufficient, THIRVAN reports the limitation rather than inferring a shortage.

---

## 🚀 Core Features

### 📊 1. Labour Market Dashboard

- Demand-related KPI cards and trend visualisations.
- Monthly demand trend analysis.
- Occupation and skill rankings.
- Sector-wise and district-wise comparisons.
- Interactive filters for district, sector, occupation, skill, and period.
- Clear identification of synthetic demonstration results.

### 📈 2. Demand Intelligence

- Structured labour-demand data models.
- CSV upload and data preview.
- Column mapping and schema validation.
- Missing-value and duplicate checks.
- Occupation-to-skill demand analysis.
- Transparent data-source and measurement definitions.

### 🔮 3. Forecasting & Evaluation

- Baseline time-series forecasting.
- Historical-versus-forecast visualisations.
- Chronological forecast evaluation.
- Mean Absolute Error (MAE).
- Weighted Absolute Percentage Error (WAPE), where appropriate.
- Forecast-bias analysis.
- Documented evaluation periods and limitations.

Forecast metrics are calculated from the available evaluation data. Synthetic-data performance demonstrates the prototype workflow; it does not establish real-world forecasting accuracy.

### 🧩 4. Potential Skill-Gap Analysis

THIRVAN supports potential gap analysis when workforce demand and supply records are genuinely comparable.

**Potential Gap = Comparable Demand − Comparable Supply**

Comparability requires matching occupation, geography, period, unit, and definition.

When these conditions are not met, the application should display:

> **Insufficient comparable supply data.**

Missing values are not automatically treated as zero.

### 🎓 5. Training Alignment

- Explore relationships between occupations, skills, and training courses.
- Display available training data with its original meaning.
- Keep seats, enrolments, candidates trained, completions, and placements as distinct measures.
- Explore potential training priorities where the available evidence supports them.

Historical training counts are not automatically workforce-supply estimates or employment outcomes.

### 🛡️ 6. Data Quality & Methodology

- Required-field and data-type validation.
- Missing-value and duplicate detection.
- Source attribution and data-period information.
- Transparent calculation definitions.
- Synthetic-versus-real data identification.
- Forecast evaluation reporting.
- Explicit limitations when the evidence does not support a conclusion.

### 📄 7. Reports & Exports

- Filtered analytical results.
- Demand and forecast summaries.
- Data-quality findings.
- Methodology and source register.
- CSV export for supported datasets and results.

---

## 🗺️ Initial Pilot Scope

The prototype focuses on Tamil Nadu as its initial demonstration geography.

**Pilot districts**
- Chennai
- Coimbatore
- Madurai
- Tiruchirappalli

**Initial sectors**
- IT and software
- Manufacturing
- Healthcare

**Example occupations and skills**
- Software development
- Data analysis
- Cybersecurity
- Artificial intelligence and machine learning
- Electronics and mechanical technology
- Production supervision
- Nursing and medical laboratory technology

These are initial prototype categories, not a claim that the data covers every occupation, district, or sector in Tamil Nadu.

---

## 🧠 Technical Approach

THIRVAN follows a modular analytics workflow:

1. **Data ingestion:** accept supported structured datasets and CSV uploads.
2. **Validation:** check schemas, required fields, data types, duplicates, and missing information.
3. **Standardisation:** align supported district, sector, occupation, and skill references.
4. **Demand analysis:** calculate trends, rankings, and documented indicators.
5. **Forecasting:** generate baseline forecasts and evaluate them chronologically.
6. **Comparability assessment:** check whether demand and supply can be compared meaningfully.
7. **Training alignment:** relate supported occupation and skill mappings to training records.
8. **Reporting:** expose sources, methods, assumptions, limitations, and exportable results.

### Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **CSV processing:** Papa Parse

The application uses typed data models for demand, supply, training capacity, source information, data quality, and forecasts.

---

## 🗂️ Project Structure

The repository contains the THIRVAN application source code and configuration.

Typical files in this stack include:

```text
thirvan/
├── public/          # Public assets
├── src/             # Application source code
├── package.json     # Dependencies and scripts
├── index.html       # Application entry point
├── vite.config.ts   # Vite configuration
├── tailwind.config.* 
└── README.md        # Project documentation
```

The exact directory structure may differ from this illustrative layout.

---

## ⚙️ Local Setup

### Prerequisites

- Node.js 18 or newer.
- npm.
- Git.

### 1. Clone the repository

```bash
git clone https://github.com/ailovable820-ux/thirvan.git
cd thirvan
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Create a production build

```bash
npm run build
```

Run these commands from the project directory. The production build should be checked for errors before deployment.

---

## 📚 Data Sources & Attribution

The prototype keeps source-derived data distinct from synthetic demonstration datasets.

### Official PMKVY training sample

The included historical sample is attributed to the Government of India Press Information Bureau / Ministry of Skill Development and Entrepreneurship.

Source: [PMKVY district-wise training figures](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2041499)

The reported candidates-trained counts are training activity measures. They are not direct measurements of labour demand, available workers, unique vacancies, or placements.

### Occupation Classification

The National Classification of Occupations reference can support occupation standardisation.

Source: [National Classification of Occupations](https://www.dge.gov.in/national_classification_of_occupations)

The occupation code and edition used should be verified before claiming that a role is officially mapped.

---

## ⚠️ Data Integrity & Prototype Limitations

THIRVAN is a prototype and must be interpreted within the limits of its datasets.

- Labour-demand and workforce-supply records used for demonstration are deterministic synthetic data.
- Synthetic values are not official Tamil Nadu labour-market statistics.
- The PMKVY sample represents historical candidates-trained counts only.
- Job postings, where used, are demand signals and are not necessarily unique vacancies or total employment.
- Workforce-gap calculations require comparable occupation, district, time period, units, and definitions.
- Missing or non-comparable supply data must not be used to infer a shortage.
- Forecast performance on synthetic data does not prove real-world forecasting accuracy.
- The current district-selection approach is searchable/list-based; unverified district boundary geometry is not claimed.
- The prototype does not claim live external integrations or verified real-time labour-market feeds.

These safeguards are central to THIRVAN's approach to transparent, evidence-informed decision support.

---

## 🔭 Future Scope

Potential future improvements, subject to data access and validation, include:

- Verified job-demand data integrations.
- Better coverage across Tamil Nadu districts and additional states.
- Documented and validated district boundary layers.
- Additional forecasting models and rolling-origin evaluation.
- More comprehensive occupation and skill taxonomies.
- Verified training-provider and course datasets.
- Expert review and feedback workflows.
- Additional reporting and scenario-analysis capabilities.

These are proposed enhancements, not claims of existing functionality.

---

## 🎯 Project Objective

THIRVAN aims to make labour-market intelligence easier to explore, evaluate, and communicate by connecting demand signals, forecasting, comparable workforce data, and training information in a transparent analytical workflow.

> **THIRVAN — Skills Meet Opportunity.**

*Built as a Smart India Hackathon 2026 prototype for SIH26246.*

---

## 📌 Repository Sync

Initial commit message:

```text
Initial commit: THIRVAN labour market intelligence prototype
```
