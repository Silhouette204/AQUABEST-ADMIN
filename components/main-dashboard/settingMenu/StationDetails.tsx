import { Droplets, MapPin } from "lucide-react";
import { SelectField, TextField } from "./SettingsFields";
import { CURRENCY_OPTIONS, SECTION_IDS, TIMEZONE_OPTIONS, type StationInfo } from "./settings";

interface Props {
  station: StationInfo;
  onChange: (patch: Partial<StationInfo>) => void;
  onUploadLogo: () => void;
}

export function StationDetailsCard({ station, onChange, onUploadLogo }: Props) {
  return (
    <div id={SECTION_IDS.station} className="scroll-mt-4 rounded-xl border border-secondary/10 bg-white p-5">
      <h2 className="font-bold">Station details</h2>

      <div className="mt-4 flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary">
          <Droplets size={26} />
        </span>
        <div>
          <button
            type="button"
            onClick={onUploadLogo}
            className="rounded-lg border border-secondary/10 bg-white px-3 py-1.5 text-xs font-semibold"
          >
            Upload station logo
          </button>
          <p className="mt-1.5 text-xs text-secondary/50">PNG or JPG, up to 2 MB</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <TextField label="Station name" value={station.name} onChange={(v) => onChange({ name: v })} />

        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Contact number"
            type="tel"
            value={station.contactNumber}
            onChange={(v) => onChange({ contactNumber: v })}
          />
          <TextField
            label="Mobile number"
            type="tel"
            value={station.mobileNumber}
            onChange={(v) => onChange({ mobileNumber: v })}
          />
        </div>

        <TextField
          label="Station email"
          type="email"
          value={station.email}
          onChange={(v) => onChange({ email: v })}
        />

        <TextField
          label="Station address"
          value={station.address}
          Icon={MapPin}
          onChange={(v) => onChange({ address: v })}
        />

        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Currency"
            value={station.currency}
            options={CURRENCY_OPTIONS}
            onChange={(v) => onChange({ currency: v })}
          />
          <SelectField
            label="Timezone"
            value={station.timezone}
            options={TIMEZONE_OPTIONS}
            onChange={(v) => onChange({ timezone: v })}
          />
        </div>
      </div>
    </div>
  );
}