# THIRVAN

THIRVAN is an AI-powered labour market intelligence and skill demand–supply forecasting prototype for SIH26246. It helps users explore labour demand signals, compare Tamil Nadu pilot districts and sectors, evaluate baseline forecasts, and understand skill gaps with transparent data-quality and methodology reporting.

## Technology stack

- React 18 with TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React
- Papa Parse for CSV workflows

## Local setup

1. Install Node.js 18 or newer.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the local development server:

   ```bash
   npm run dev
   ```

4. Create a production build:

   ```bash
   npm run build
   ```

## Features

- THIRVAN landing page with the supplied project emblem
- Responsive application shell using the THIRVAN navy, teal and gold palette
- Tamil Nadu district, sector, occupation and period filters
- Demand KPIs and calculated monthly, sector, district and occupation views
- Derived occupation-to-skill demand analysis
- Typed data models for demand, supply, training capacity, sources, quality and forecasts
- Deterministic synthetic labour-demand and limited workforce-supply demo datasets
- Official PMKVY historical training sample kept separate from synthetic demand and supply data
- Baseline chronological forecast evaluation with MAE, WAPE and bias metrics
- Data-quality and comparability rules that do not treat missing values as zero
- Source attribution and explicit synthetic-data disclosures

## Data and prototype limitations

This is a prototype. Labour demand and workforce supply records are deterministic synthetic demo data and must not be presented as official Tamil Nadu labour-market statistics. The PMKVY sample contains historical candidates-trained counts only; it is not a vacancy, employment or workforce-supply dataset.

Potential gaps are calculated only when demand and supply use comparable occupation, district, period and units. Otherwise, THIRVAN should report insufficient comparable supply data rather than infer a shortage. District selection currently uses a searchable/list-based reference approach; no unverified boundary geometry is included.

The prototype does not claim live external integrations, official forecast accuracy, unique vacancies, total employment or placement outcomes.

## Source attribution

The official training sample is attributed to the PIB / Ministry of Skill Development and Entrepreneurship PMKVY report:

<https://www.pib.gov.in/PressReleasePage.aspx?PRID=2041499>

Occupation reference attribution is based on the National Classification of Occupations reference:

<https://www.dge.gov.in/national_classification_of_occupations>

## Repository sync

The intended initial commit message is:

`Initial commit: THIRVAN labour market intelligence prototype.`
