import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'components/common/react-notifications';
import {
  getPlanList,
  createPlanList,
  updatePlanList,
} from '../../../redux/auctionHouse/httpCalls.auctionHouse';

const PLAN_NAMES = ['Spark', 'Blaze', 'Inferno'];
const defaultRow = () => ({
  id: Math.random().toString(36).substr(2, 9),
  billingCycle: '',
  price: '',
  discount: '',
  notes: '',
  revenueShare: {
    highestUnique: '',
    lowestUnique: '',
    lastPlay: '',
  },
});

function PlanCard({ plan, data, onChange, onSubmit }) {
  const [touched, setTouched] = useState(false);
  const isRowValid = (row) => {
    return (
      row.billingCycle.trim() !== '' &&
      row.price !== '' &&
      row.discount !== '' &&
      row.notes.trim() !== '' &&
      row.revenueShare.highestUnique !== '' &&
      row.revenueShare.lowestUnique !== '' &&
      row.revenueShare.lastPlay !== ''
    );
  };
  const isDescriptionValid = data.description.trim() !== '';
  const allRowsValid = data.rows.every(isRowValid);
  const isValid = allRowsValid && isDescriptionValid;

  const getFieldError = (row, field) => {
    if (!touched) return '';
    if (field === 'billingCycle' && row.billingCycle.trim() === '')
      return 'Required';
    if (field === 'price' && row.price === '') return 'Required';
    if (field === 'discount' && row.discount === '') return 'Required';
    if (field === 'notes' && row.notes.trim() === '') return 'Required';
    if (field === 'highestUnique' && row.revenueShare.highestUnique === '')
      return 'Required';
    if (field === 'lowestUnique' && row.revenueShare.lowestUnique === '')
      return 'Required';
    if (field === 'lastPlay' && row.revenueShare.lastPlay === '')
      return 'Required';
    return '';
  };

  const getDescriptionError = () => {
    if (!touched) return '';
    if (!isDescriptionValid) return 'Required';
    return '';
  };

  const handleRowChange = (idx, field, value) => {
    const newRows = data.rows.map((row, i) =>
      i === idx ? { ...row, [field]: value } : row
    );
    onChange({ ...data, rows: newRows });
  };

  const handleRevenueShareChange = (idx, subField, value) => {
    const newRows = data.rows.map((row, i) =>
      i === idx
        ? { ...row, revenueShare: { ...row.revenueShare, [subField]: value } }
        : row
    );
    onChange({ ...data, rows: newRows });
  };

  const addRow = () => {
    onChange({ ...data, rows: [...data.rows, defaultRow()] });
  };

  const removeRow = (idx) => {
    if (data.rows.length > 1) {
      onChange({ ...data, rows: data.rows.filter((_, i) => i !== idx) });
    }
  };

  const handleDescriptionChange = (e) => {
    onChange({ ...data, description: e.target.value });
  };

  // Theme detection for card background
  const theme =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('__theme_selected_color')
      : null;
  const isLightTheme = theme === 'light.purplemonster';
  const labelColor = isLightTheme ? '#222' : '#fff';
  const labelShadow = isLightTheme
    ? '0 4px 24px rgba(0,0,0,0.30)'
    : '0 4px 24px rgba(255, 255, 255, 0.2)';
  return (
    <div
      style={{
        borderRadius: 18,
        padding: 32,
        marginBottom: 40,
        background: isLightTheme ? 'rgb(206 207 207)' : '#242224',
        boxShadow: labelShadow,
      }}
    >
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: labelColor,
          marginBottom: 18,
          letterSpacing: 1,
        }}
      >
        {plan} Plan
      </h2>
      <div>
        <div style={{ margin: '20px 0', width: '100%' }}>
          <label
            htmlFor={`desc-${plan}`}
            style={{
              width: '100%',
              display: 'block',
              fontWeight: 600,
              color: labelColor,
              marginBottom: 6,
            }}
          >
            Description
            <br />
            <textarea
              id={`desc-${plan}`}
              value={data.description}
              onChange={handleDescriptionChange}
              rows={2}
              style={{
                width: '100%',
                minWidth: '100%',
                maxWidth: '100%',
                resize: 'vertical',
                padding: '14px 18px',
                borderRadius: 12,
                border: '1.5px solid #444',
                background: isLightTheme ? '#fff' : '#222',
                color: isLightTheme ? '#222' : '#fff',
                fontSize: 16,
                outline: 'none',
                boxShadow: '0 1px 6px rgba(0,0,0,0.20)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1976d2';
                e.target.style.boxShadow = '0 0 0 2px #1976d2';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#444';
                e.target.style.boxShadow = '0 1px 6px rgba(0,0,0,0.20)';
              }}
            />
          </label>
          {getDescriptionError() && (
            <div style={{ color: '#ff5252', fontSize: 13 }}>
              {getDescriptionError()}
            </div>
          )}
        </div>
        {data.rows.map((row, idx) => {
          const billingId = `billing-${plan}-${row.id}`;
          const priceId = `price-${plan}-${row.id}`;
          const discountId = `discount-${plan}-${row.id}`;
          const notesId = `notes-${plan}-${row.id}`;
          const highestId = `highest-${plan}-${row.id}`;
          const lowestId = `lowest-${plan}-${row.id}`;
          const lastPlayId = `lastplay-${plan}-${row.id}`;
          return (
            <div
              key={row.id}
              className="plan-row"
              style={{
                display: 'flex',
                gap: 32,
                alignItems: 'flex-start',
                marginBottom: 20,
                flexWrap: 'wrap',
                background: '#282626',
                borderRadius: 14,
                boxShadow: '0 2px 12px rgba(0,0,0,0.20)',
                padding: 18,
              }}
            >
              <div style={{ flex: '2 1 0px', minWidth: 260 }}>
                <div style={{ display: 'flex', gap: 18 }}>
                  <div className="plan-field" style={{ flex: 1 }}>
                    <label
                      htmlFor={billingId}
                      style={{
                        fontWeight: 600,
                        color: labelColor,
                        marginBottom: 6,
                        display: 'block',
                      }}
                    >
                      Billing Cycle
                      <br />
                      <input
                        id={billingId}
                        type="text"
                        value={row.billingCycle}
                        onChange={(e) =>
                          handleRowChange(idx, 'billingCycle', e.target.value)
                        }
                        style={{
                          width: '100%',
                          minWidth: 140,
                          maxWidth: 140,
                          padding: '10px 14px',
                          borderRadius: 10,
                          border: '1.5px solid #393939',
                          background: '#232020',
                          color: '#fff',
                          fontSize: 16,
                          outline: 'none',
                          boxShadow: '0 1px 6px rgba(0,0,0,0.20)',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1976d2';
                          e.target.style.boxShadow = '0 0 0 2px #1976d2';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#b6c6e3';
                          e.target.style.boxShadow =
                            '0 1px 6px rgba(60,80,120,0.07)';
                        }}
                      />
                    </label>
                    {getFieldError(row, 'billingCycle') && (
                      <div style={{ color: 'red', fontSize: 12 }}>
                        {getFieldError(row, 'billingCycle')}
                      </div>
                    )}
                  </div>
                  <div className="plan-field" style={{ flex: 1 }}>
                    <label
                      htmlFor={priceId}
                      style={{
                        fontWeight: 600,
                        color: labelColor,
                        marginBottom: 6,
                        display: 'block',
                      }}
                    >
                      Price ($)
                      <br />
                      <input
                        id={priceId}
                        type="number"
                        value={row.price}
                        onChange={(e) =>
                          handleRowChange(idx, 'price', e.target.value)
                        }
                        style={{
                          width: '100%',
                          minWidth: 140,
                          maxWidth: 140,
                          padding: '10px 14px',
                          borderRadius: 10,
                          border: '1.5px solid #393939',
                          background: isLightTheme ? '#000' : '#fff',
                          color: isLightTheme ? '#000' : '#fff',
                          fontSize: 16,
                          outline: 'none',
                          boxShadow: '0 1px 6px rgba(0,0,0,0.20)',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                        min="0"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1976d2';
                          e.target.style.boxShadow = '0 0 0 2px #1976d2';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#b6c6e3';
                          e.target.style.boxShadow =
                            '0 1px 6px rgba(60,80,120,0.07)';
                        }}
                        onWheel={(e) => e.target.blur()}
                        onKeyDown={(e) =>
                          (e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
                          e.preventDefault()
                        }
                      />
                    </label>
                    {getFieldError(row, 'price') && (
                      <div style={{ color: 'red', fontSize: 12 }}>
                        {getFieldError(row, 'price')}
                      </div>
                    )}
                  </div>
                  <div className="plan-field" style={{ flex: 1 }}>
                    <label
                      htmlFor={discountId}
                      style={{
                        fontWeight: 600,
                        color: labelColor,
                        marginBottom: 6,
                        display: 'block',
                      }}
                    >
                      Discount (%)
                      <br />
                      <input
                        id={discountId}
                        type="number"
                        value={row.discount}
                        onChange={(e) =>
                          handleRowChange(idx, 'discount', e.target.value)
                        }
                        style={{
                          width: '100%',
                          minWidth: 140,
                          maxWidth: 140,
                          padding: '10px 14px',
                          borderRadius: 10,
                          border: '1.5px solid #393939',
                          background: '#232020',
                          color: '#fff',
                          fontSize: 16,
                          outline: 'none',
                          boxShadow: '0 1px 6px rgba(0,0,0,0.20)',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                        min="0"
                        max="100"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1976d2';
                          e.target.style.boxShadow = '0 0 0 2px #1976d2';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#b6c6e3';
                          e.target.style.boxShadow =
                            '0 1px 6px rgba(60,80,120,0.07)';
                        }}
                        onWheel={(e) => e.target.blur()}
                        onKeyDown={(e) =>
                          (e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
                          e.preventDefault()
                        }
                      />
                    </label>
                    {getFieldError(row, 'discount') && (
                      <div style={{ color: 'red', fontSize: 12 }}>
                        {getFieldError(row, 'discount')}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: 8, width: '100%' }}>
                  <label
                    htmlFor={notesId}
                    style={{
                      width: '100%',
                      display: 'block',
                      fontWeight: 600,
                      color: labelColor,
                      marginBottom: 6,
                    }}
                  >
                    Notes
                    <br />
                    <textarea
                      id={notesId}
                      value={row.notes}
                      onChange={(e) =>
                        handleRowChange(idx, 'notes', e.target.value)
                      }
                      rows={2}
                      style={{
                        width: '100%',
                        minWidth: '100%',
                        maxWidth: '100%',
                        padding: '12px 16px',
                        borderRadius: 12,
                        border: '1.5px solid #393939',
                        background: isLightTheme ? '#fff' : '#222',
                        color: isLightTheme ? '#222' : '#fff',
                        fontSize: 16,
                        outline: 'none',
                        boxShadow: '0 1px 6px rgba(0,0,0,0.20)',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#1976d2';
                        e.target.style.boxShadow = '0 0 0 2px #1976d2';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#b6c6e3';
                        e.target.style.boxShadow =
                          '0 1px 6px rgba(60,80,120,0.07)';
                      }}
                    />
                  </label>
                  {getFieldError(row, 'notes') && (
                    <div style={{ color: 'red', fontSize: 12 }}>
                      {getFieldError(row, 'notes')}
                    </div>
                  )}
                </div>
                {idx > 0 && (
                  <button
                    type="button"
                    className="plan-remove-btn"
                    onClick={() => removeRow(idx)}
                    style={{
                      background:
                        'linear-gradient(90deg, #ff5252 60%, #fff 100%)',
                      color: '#242224',
                      border: 'none',
                      borderRadius: 8,
                      padding: '6px 18px',
                      cursor: 'pointer',
                      minWidth: 80,
                      marginTop: 8,
                      fontWeight: 600,
                      fontSize: 15,
                      boxShadow: '0 2px 8px rgba(255,82,82,0.15)',
                      transition: 'box-shadow 0.2s',
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
              <fieldset
                className="plan-fieldset"
                style={{
                  border: '1px solid #222',
                  borderRadius: 14,
                  padding: 16,
                  minInlineSize: 0,
                  flex: '1 1 220px',
                  marginBottom: 8,
                  minWidth: 180,
                  background:
                    'linear-gradient(135deg, #23272a 0%, #181a1b 100%) !important',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.20)',
                }}
              >
                <legend
                  style={{
                    fontWeight: 700,
                    background: '#222',
                    padding: '6px 22px',
                    borderRadius: '16px',
                    border: '1px solid #444',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.20)',
                    display: 'inline-block',
                    fontSize: 17,
                    color: '#fff',
                    letterSpacing: 1,
                  }}
                >
                  Revenue Share
                </legend>
                <div
                  style={{ display: 'flex', gap: 12, flexDirection: 'column' }}
                >
                  <div style={{ display: 'flex', gap: 18 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                      }}
                    >
                      <label
                        htmlFor={highestId}
                        style={{
                          fontWeight: 600,
                          color: labelColor,
                          marginBottom: 6,
                          display: 'block',
                        }}
                      >
                        Highest Unique (%)
                        <br />
                        <input
                          id={highestId}
                          type="number"
                          value={row.revenueShare.highestUnique}
                          onChange={(e) =>
                            handleRevenueShareChange(
                              idx,
                              'highestUnique',
                              e.target.value
                            )
                          }
                          style={{
                            width: '100%',
                            minWidth: 120,
                            maxWidth: 120,
                            padding: '10px 14px',
                            borderRadius: 10,
                            border: '1.5px solid #444',
                            background: isLightTheme ? '#fff' : '#222',
                            color: isLightTheme ? '#222' : '#fff',
                            fontSize: 16,
                            outline: 'none',
                            boxShadow: '0 1px 6px rgba(0,0,0,0.20)',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                          }}
                          min="0"
                          max="100"
                          onFocus={(e) => {
                            e.target.style.borderColor = '#1976d2';
                            e.target.style.boxShadow = '0 0 0 2px #1976d2';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#b6c6e3';
                            e.target.style.boxShadow =
                              '0 1px 6px rgba(60,80,120,0.07)';
                          }}
                          onWheel={(e) => e.target.blur()}
                          onKeyDown={(e) =>
                            (e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
                            e.preventDefault()
                          }
                        />
                      </label>
                      {getFieldError(row, 'highestUnique') && (
                        <div style={{ color: 'red', fontSize: 12 }}>
                          {getFieldError(row, 'highestUnique')}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                      }}
                    >
                      <label
                        htmlFor={lowestId}
                        style={{
                          fontWeight: 600,
                          color: labelColor,
                          marginBottom: 6,
                          display: 'block',
                        }}
                      >
                        Lowest Unique (%)
                        <br />
                        <input
                          id={lowestId}
                          type="number"
                          value={row.revenueShare.lowestUnique}
                          onChange={(e) =>
                            handleRevenueShareChange(
                              idx,
                              'lowestUnique',
                              e.target.value
                            )
                          }
                          style={{
                            width: '100%',
                            minWidth: 120,
                            maxWidth: 120,
                            padding: '10px 14px',
                            borderRadius: 10,
                            border: '1.5px solid #444',
                            background: isLightTheme ? '#fff' : '#222',
                            color: isLightTheme ? '#222' : '#fff',
                            fontSize: 16,
                            outline: 'none',
                            boxShadow: '0 1px 6px rgba(0,0,0,0.20)',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                          }}
                          min="0"
                          max="100"
                          onFocus={(e) => {
                            e.target.style.borderColor = '#1976d2';
                            e.target.style.boxShadow = '0 0 0 2px #1976d2';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#b6c6e3';
                            e.target.style.boxShadow =
                              '0 1px 6px rgba(60,80,120,0.07)';
                          }}
                          onWheel={(e) => e.target.blur()}
                          onKeyDown={(e) =>
                            (e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
                            e.preventDefault()
                          }
                        />
                      </label>
                      {getFieldError(row, 'lowestUnique') && (
                        <div style={{ color: 'red', fontSize: 12 }}>
                          {getFieldError(row, 'lowestUnique')}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                      }}
                    >
                      <label
                        htmlFor={lastPlayId}
                        style={{
                          fontWeight: 600,
                          color: labelColor,
                          marginBottom: 6,
                          display: 'block',
                        }}
                      >
                        The Last Play (%)
                        <br />
                        <input
                          id={lastPlayId}
                          type="number"
                          value={row.revenueShare.lastPlay}
                          onChange={(e) =>
                            handleRevenueShareChange(
                              idx,
                              'lastPlay',
                              e.target.value
                            )
                          }
                          style={{
                            width: '100%',
                            minWidth: 120,
                            maxWidth: 120,
                            padding: '10px 14px',
                            borderRadius: 10,
                            border: '1.5px solid #444',
                            background: isLightTheme ? '#fff' : '#222',
                            color: isLightTheme ? '#222' : '#fff',
                            fontSize: 16,
                            outline: 'none',
                            boxShadow: '0 1px 6px rgba(0,0,0,0.20)',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                          }}
                          min="0"
                          max="100"
                          onFocus={(e) => {
                            e.target.style.borderColor = '#1976d2';
                            e.target.style.boxShadow = '0 0 0 2px #1976d2';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#b6c6e3';
                            e.target.style.boxShadow =
                              '0 1px 6px rgba(60,80,120,0.07)';
                          }}
                          onWheel={(e) => e.target.blur()}
                          onKeyDown={(e) =>
                            (e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
                            e.preventDefault()
                          }
                        />
                      </label>
                      {getFieldError(row, 'lastPlay') && (
                        <div style={{ color: 'red', fontSize: 12 }}>
                          {getFieldError(row, 'lastPlay')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          );
        })}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <button
            type="button"
            onClick={addRow}
            style={{
              background: 'linear-gradient(90deg, #444 60%, #222 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 32px',
              minWidth: 140,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.30)',
              transition: 'box-shadow 0.2s',
            }}
          >
            + Add Row
          </button>
          <button
            type="button"
            onClick={() => {
              if (!touched) setTouched(true);
              if (isValid) onSubmit();
            }}
            style={{
              background: isValid
                ? 'linear-gradient(90deg, #222 60%, #444 100%)'
                : '#555',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 32px',
              minWidth: 140,
              cursor: isValid ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              fontSize: 16,
              boxShadow: isValid ? '0 2px 12px rgba(0,0,0,0.30)' : 'none',
              transition: 'box-shadow 0.2s',
            }}
            disabled={!isValid}
          >
            Submit
          </button>
        </div>
      </div>
      {!isValid && touched && (
        <div style={{ color: 'red', marginTop: 8 }}>
          Please fill all fields before submitting.
        </div>
      )}
    </div>
  );
}

function Plans() {
  const [plansData, setPlansData] = useState(
    PLAN_NAMES.reduce((acc, name) => {
      acc[name] = { rows: [defaultRow()], description: '' };
      return acc;
    }, {})
  );

  const [planIdMap, setPlanIdMap] = useState({});
  const fetchPlans = React.useCallback(async () => {
    const res = await getPlanList();
    if (res && res.data && Array.isArray(res.data)) {
      const newPlans = {};
      const newPlanIdMap = {};
      res.data.forEach((planObj) => {
        let rows = Array.isArray(planObj.planPrices)
          ? planObj.planPrices.map((price) => ({
              id: price.id,
              billingCycle: price.billing_cycle_months
                ? price.billing_cycle_months.toString()
                : '',
              price: price.price || '',
              discount: price.discount_percent || '',
              notes: price.notes || '',
              revenueShare: {
                highestUnique: price.revenue_share?.HU?.toString() || '',
                lowestUnique: price.revenue_share?.LU?.toString() || '',
                lastPlay: price.revenue_share?.TLP?.toString() || '',
              },
              created_at: price.created_at,
            }))
          : [defaultRow()];

        rows = rows.map(({ created_at, ...rest }) => rest);

        newPlans[planObj.name] = {
          rows,
          description: planObj.description || '',
        };
        newPlanIdMap[planObj.name] = planObj.id;
      });
      setPlansData((prev) => ({ ...prev, ...newPlans }));
      setPlanIdMap(newPlanIdMap);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Theme detection
  const theme =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('__theme_selected_color')
      : null;
  const isLightTheme = theme === 'light.purplemonster';

  // Light theme styles
  const pageBg = isLightTheme ? '#fff' : '#181a1b';
  const cardRowBg = isLightTheme ? '#f0f0f5' : '#282626';
  const fieldBg = isLightTheme ? '#fff' : '#232020';
  const fieldsetBg = isLightTheme
    ? 'linear-gradient(135deg, #f7f7fa 0%, #eaeaf0 100%)'
    : 'linear-gradient(135deg, #23272a 0%, #181a1b 100%)';
  const fieldsetBorder = isLightTheme ? '#e0e0e0' : '#222';
  const legendBg = isLightTheme ? '#eaeaf0' : '#222';
  const legendColor = isLightTheme ? '#222' : '#fff';
  const textColor = isLightTheme ? '#000' : '#fff';

  const handlePlanChange = (plan, newData) => {
    setPlansData((prev) => ({ ...prev, [plan]: newData }));
  };

  const rowToApi = (row) => {
    const apiRow = {
      billing_cycle_months: Number(row.billingCycle) || 0,
      price: Number(row.price) || 0,
      discount_percent: Number(row.discount) || 0,
      notes: row.notes,
      revenue_share: {
        HU: Number(row.revenueShare.highestUnique) || 0,
        LU: Number(row.revenueShare.lowestUnique) || 0,
        TLP: Number(row.revenueShare.lastPlay) || 0,
      },
    };
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (row.id && uuidRegex.test(row.id)) {
      apiRow.id = row.id;
    }
    return apiRow;
  };

  const getPlanId = (planName) => planIdMap[planName] || '';

  const handleSubmit = async (plan) => {
    const planData = plansData[plan];
    // Check for duplicate billingCycle in this plan's rows
    const billingCycles = planData.rows.map((row) => row.billingCycle.trim());
    const hasDuplicate = billingCycles.some(
      (cycle, idx) => cycle !== '' && billingCycles.indexOf(cycle) !== idx
    );
    if (hasDuplicate) {
      NotificationManager.error('This Billing Cycle month already Added');
      return;
    }
    const res = await getPlanList();
    const apiNames = res && res.data ? res.data.map((p) => p.name) : [];
    const allExist = PLAN_NAMES.every((n) => apiNames.includes(n));

    if (allExist) {
      const planId = getPlanId(plan);
      const payload = {
        id: planId,
        name: plan,
        description: planData.description,
        planPrices: planData.rows.map((row) => rowToApi(row)),
      };
      try {
        const updateRes = await updatePlanList(payload, planId);
        if (updateRes && updateRes.success) {
          NotificationManager.success(
            updateRes.message || 'Plan updated successfully!'
          );
          await fetchPlans();
        } else {
          NotificationManager.error(updateRes?.message || 'Update failed!');
        }
      } catch (err) {
        NotificationManager.error('Update failed!');
      }
    } else {
      const payload = {
        name: plan,
        description: planData.description,
        planPrices: planData.rows.map((row) => rowToApi(row)),
      };
      try {
        const createRes = await createPlanList(payload);
        if (createRes && createRes.success) {
          NotificationManager.success(
            createRes.message || 'Plan created successfully!'
          );
          await fetchPlans();
        } else {
          NotificationManager.error(createRes?.message || 'Create failed!');
        }
      } catch (err) {
        NotificationManager.error('Create failed!');
      }
    }
  };

  return (
    <>
      <style>{`
        body, #root, .plans-page-bg {
          background: ${pageBg} !important;
        }
        .plan-card {
          color: ${textColor} !important;
        }
        .plan-row {
          background: ${cardRowBg} !important;
        }
        .plan-field input, .plan-field textarea {
          background: ${fieldBg} !important;
          color: ${textColor} !important;
        }
        .plan-fieldset {
          background: ${fieldsetBg} !important;
          border: 1px solid ${fieldsetBorder} !important;
        }
        .plan-fieldset legend {
          background: ${legendBg} !important;
          color: ${legendColor} !important;
        }
        @media (max-width: 1100px) {
          .plan-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0 !important;
          }
          .plan-fieldset {
            width: 100% !important;
            min-width: 0 !important;
            margin-bottom: 12px !important;
          }
        }
        @media (max-width: 700px) {
          .plan-card {
            padding: 12px !important;
          }
        }
        @media (max-width: 600px) {
          .plan-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0 !important;
          }
          .plan-field, .plan-fieldset {
            min-width: 0 !important;
            width: 100% !important;
            margin-bottom: 12px !important;
          }
          .plan-remove-btn {
            width: 100% !important;
            margin-bottom: 12px !important;
          }
        }
      `}</style>
      <div
        className="plans-page-bg"
        style={{ minHeight: '100vh', background: pageBg }}
      >
        <h1 style={{ color: textColor }}>Plans Management</h1>
        {PLAN_NAMES.map((plan) => (
          <div className="plan-card" key={plan}>
            <PlanCard
              plan={plan}
              data={plansData[plan]}
              onChange={(data) => handlePlanChange(plan, data)}
              onSubmit={() => handleSubmit(plan)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Plans;
