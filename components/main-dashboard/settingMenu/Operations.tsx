import { NumberField, SelectField, ToggleRow } from "./SettingsFields";
import { TIME_OPTIONS, type OperationsConfig } from "./settings";

interface Props {
  operations: OperationsConfig;
  onChange: (patch: Partial<OperationsConfig>) => void;
}

export function OperationsCard({ operations, onChange }: Props) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <h2 className="font-bold">Operations</h2>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <SelectField
          label="Opening time"
          value={operations.openingTime}
          options={TIME_OPTIONS}
          onChange={(v) => onChange({ openingTime: v })}
        />
        <SelectField
          label="Closing time"
          value={operations.closingTime}
          options={TIME_OPTIONS}
          onChange={(v) => onChange({ closingTime: v })}
        />
        <NumberField
          label="Delivery radius"
          value={operations.deliveryRadiusKm}
          suffix="km"
          onChange={(v) => onChange({ deliveryRadiusKm: v })}
        />
        <NumberField
          label="Default delivery fee"
          value={operations.defaultDeliveryFee}
          step={0.01}
          prefix="₱"
          onChange={(v) => onChange({ defaultDeliveryFee: v })}
        />
      </div>

      <div className="mt-5 space-y-5 border-t border-secondary/10 pt-5">
        <ToggleRow
          label="Accept online orders"
          description="Customers can place orders during operating hours."
          checked={operations.acceptOnlineOrders}
          onChange={(v) => onChange({ acceptOnlineOrders: v })}
        />
        <ToggleRow
          label="Automatic low-stock alerts"
          description="Notify admins when stock falls below the minimum."
          checked={operations.lowStockAlerts}
          onChange={(v) => onChange({ lowStockAlerts: v })}
        />
        <ToggleRow
          label="Require delivery proof"
          description="Riders must upload a photo to complete a delivery."
          checked={operations.requireDeliveryProof}
          onChange={(v) => onChange({ requireDeliveryProof: v })}
        />
      </div>
    </div>
  );
}