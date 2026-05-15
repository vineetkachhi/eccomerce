<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Welcome Email</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f7fb; padding:40px 0;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0" border="0"
                    style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                        <td align="center"
                            style="background:linear-gradient(135deg,#4f46e5,#7c3aed); padding:40px 20px; color:#ffffff;">
                            <h1 style="margin:0; font-size:32px;">Welcome 🎉</h1>
                            <p style="margin-top:10px; font-size:16px; opacity:0.9;">
                                Thank you for joining us
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:40px 35px; color:#333333;">

                            <h2 style="margin-top:0; font-size:24px; color:#111827;">
                                Hello {{ usfirst($user->name) }},
                            </h2>

                            <p style="font-size:16px; line-height:28px; color:#4b5563;">
                                Your account has been successfully created.
                                We are excited to have you as part of our community.
                            </p>

                            <p style="font-size:16px; line-height:28px; color:#4b5563;">
                                You can now login and start exploring all the amazing features available on our
                                platform.
                            </p>

                            <!-- Button -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin:35px 0;">
                                <tr>
                                    <td align="center" bgcolor="#4f46e5" style="border-radius:8px;">
                                        <a href="{{ url('/signin') }}"
                                            style="display:inline-block; padding:14px 30px; font-size:16px; color:#ffffff; text-decoration:none; font-weight:bold; border-radius:8px;">
                                            Login Now
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Info Box -->
                            <div
                                style="background:#f9fafb; border-left:4px solid #4f46e5; padding:18px; border-radius:6px; margin-top:20px;">
                                <p style="margin:0; font-size:15px; color:#374151; line-height:24px;">
                                    If you did not create this account, please ignore this email.
                                </p>
                            </div>

                            <p style="margin-top:35px; font-size:16px; color:#4b5563;">
                                Regards,<br>
                                <strong>{{ config('app.name') }}</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background:#111827; color:#9ca3af; padding:20px; font-size:14px;">
                            © {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>
