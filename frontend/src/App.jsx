import { useState } from "react";
import "./App.css";

const initialForm = {
  name: "",
  phone: "",
  issue: "",
  consent: false,
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.consent) {
      setError("Подтвердите согласие на обработку персональных данных.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/leads/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        const firstError = Object.values(data).flat()[0];
        throw new Error(firstError || "Не удалось отправить заявку.");
      }

      setForm(initialForm);
      setStatus("success");
    } catch (requestError) {
      setError(requestError.message || "Не удалось отправить заявку.");
      setStatus("error");
    }
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="hero__content">
          <img
            className="brand-logo"
            src="/act-print-logo.png"
            alt="ACT-PRINT — ремонт принтеров"
          />

          <h1>Ремонт принтеров в Москве</h1>

          <p className="hero__description">
            Диагностика на месте, цену называем до работ. Гарантия 90 дней.
          </p>

          <ul className="advantages">
            <li>Выезд по Москве — бесплатный</li>
            <li>Работы мастера — от 800 ₽</li>
            <li>Диагностика бесплатна при ремонте</li>
            <li>Гарантия на работы — 90 дней</li>
          </ul>

          <a className="phone" href="tel:+74951916190">
            📞 +7 (495) 191-61-90
          </a>
        </div>

        <form className="lead-form" onSubmit={handleSubmit}>
          <p className="lead-form__label">Ремонт принтеров и МФУ</p>

          <h2>Оставьте заявку — перезвоним и назовём цену</h2>

          <p className="lead-form__description">
            Опишите, что случилось с аппаратом. Перезваниваем в рабочее время,
            обычно в течение 15 минут.
          </p>

          <label>
            Как к вам обращаться
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              minLength="2"
              required
            />
          </label>

          <label>
            Телефон
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+7 (___) ___-__-__"
              required
            />
          </label>

          <label>
            Что с принтером? <span>(необязательно)</span>
            <textarea
              name="issue"
              value={form.issue}
              onChange={handleChange}
              placeholder="Например: не печатает, полосы на листе, замятие бумаги"
              rows="4"
            />
          </label>

          <label className="consent">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              required
            />
            <span>
              Согласен с{" "}
              <a href="/privacy" target="_blank" rel="noreferrer">
                политикой обработки персональных данных
              </a>{" "}
              и{" "}
              <a href="/offer" target="_blank" rel="noreferrer">
                офертой
              </a>
              . Данные нужны только для ответа на заявку.
            </span>
          </label>

          {error && <p className="form-message form-message--error">{error}</p>}

          {status === "success" && (
            <p className="form-message form-message--success">
              Заявка принята. Мы перезвоним в рабочее время.
            </p>
          )}

          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Отправляем…" : "Вызвать мастера →"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;