import nodemailer from "nodemailer";

export const receiveContactEmail = (userEmail, userNames) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
  let transporter = nodemailer.createTransport(config);

  let message = {
    from: process.env.Email,
    to: userEmail,
    subject:
      "Thank you for connect with Holidays Planners - Your request Has Been Received",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your request Has Been Received to Smart Parking System</title>

    <style>
      body {
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      .header {
        background-color: #009688;
        padding: 20px;
        text-align: center;
      }

      .header img {
        max-width: 200px;
        height: auto;
      }

      .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #333;
        font-size: 28px;
        margin: 0;
        padding-bottom: 10px;
        text-align: center;
      }

      p {
        color: #666;
        font-size: 16px;
        margin: 0;
        text-align: center;
      }

      .button-container {
        text-align: center;
        margin-top: 20px;
      }

      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #009688;
        color: #fff;
        font-weight: bold;
        border-radius: 5px;
        text-decoration: none;
      }

      .button:hover {
        background-color: #007a6e;
      }

      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <a
        href="https://holiday-planer-project.onrender.com/holidays/tours/gettours"
        ><img
          src="https://html.geekcodelab.com/holiday-planners/assets/images/logo.png"
          alt="HolidaysPlanners logo"
      /></a>
    </div>
    <div class="content">
      <h1>Thank you for contacting Holidays Planners!</h1>
      <p>
        Dear ${userNames?.split(" ")[0]},
        <br /><br />
        We sincerely appreciate your contact with Holidays Planners. Your valuable feedback has been received, and we are excited to engage with you to plan unforgettable travel experiences.<br /><br /><br />
        Your journey with Holidays Planners commences now. We invite you to explore our website, discover exciting destinations, and initiate the planning of your next remarkable getaway.
      </p>
      <div class="button-container">
        <a
          href="https://holiday-planer-project.onrender.com/holidays/tours/gettours"
          class="button"
          >Discover Tours</a
        >
      </div>
    </div>
    <div class="footer">
      Thank you for choosing Holidays Planners. We are enthusiastic to have the opportunity to assist you in creating memorable travel experiences that will last a lifetime.<br /><br />

      If you have any questions or need assistance, please feel free to contact our dedicated support team at holidaysplanners30@gmail.com.
<br /><br /><br />

      Your adventure starts here!<br /><br />
      <br />

      Best regards,
    </div>
  </body>
</html>
`,
  };

  transporter.sendMail(message);
};
