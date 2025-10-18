--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfdwnnux000aiewgbhnx4dou', NULL, 'a2@g.com', '$2b$10$PEH.CeDOwobod2DmDzS0x.ZruQZu50.9xvag5efBxZ/m1/z52tN2G', 'a2', 'PATIENT', '2025-09-10 11:37:37.161', '2025-09-10 11:37:37.161');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfdwntpj000ciewg6gdmo1k2', NULL, 'a@g.com', '$2b$10$/nAUBejTPxjtofg5wsDvzudZ7KInZdOZoM/P0eent0QAIOyval4yS', 'a', 'SUPERADMIN', '2025-09-10 11:37:44.743', '2025-09-10 11:37:44.743');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfdwn7zr0006iewgmwr38z0t', NULL, 'd1@g.com', '$2b$10$dHeELzzWZk.wiqL17RtFY.TDI8pxC4D72VrUo1Kkd4AhNnZoIuxK6', 'd1', 'DOCTOR', '2025-09-10 11:37:16.596', '2025-09-10 11:47:16.484');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfdwn1tz0004iewg1k96w278', NULL, 'd2@g.com', '$2b$10$tyx1TQwjAx9lsU5IrAZJ4OSdH9hzPfjp.rPHf7LEFB6CjAqnn5Vnu', 'd2', 'DOCTOR', '2025-09-10 11:37:08.615', '2025-09-10 11:47:33.019');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfdwllq40000iewgetrt3gr0', NULL, 'p1@g.com', '$2b$10$AslVHd06.7M3xxaFUbVOyuWiOOn3sW9cQ.kOMJL9HMH7zrdobxwX2', 'p1', 'PHARMACY_ADMIN', '2025-09-10 11:36:01.083', '2025-09-10 11:50:31.992');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfdwms360002iewg9iwq3vd0', NULL, 'p2@g.com', '$2b$10$Z/uOtrPEVt66S69NZjJJWO4LNUVkfF8fXuZf0BhBapsUxYcNL1r/u', 'p2', 'PHARMACY_ADMIN', '2025-09-10 11:36:55.986', '2025-09-10 11:50:52.07');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfe75qiv0008ie5kc6eykesv', '', 'ak@gmail.com', '$2b$10$izIhUZZMusW..LwXaWZZSuRj1ZmNbIqH3tb/Gfq8iU4toQuasRGra', 'Aryan ', 'PATIENT', '2025-09-10 16:31:36.582', '2025-09-10 16:31:36.582');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfe7hxvz0006ieycijqk2ad2', '9876543210', 's@g.com', '$2b$10$kjwc9RJg/o09LThGi8v4e.YCP1LZ9lY/bu9WDHH2IjEl18DGmuvpe', 'shuklu', 'PHARMACY_ADMIN', '2025-09-10 16:41:05.999', '2025-09-10 17:02:00.579');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfdwnhep0008iewgqjywkds6', NULL, 'a1@g.com', '$2b$10$b8bAbLA0Ahs8gw3KuB3UveKI2Bv2VMjmJAQy0IHciEx3YyWuf6N1K', 'a1', 'DOCTOR', '2025-09-10 11:37:28.802', '2025-09-10 17:02:18.237');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfexu27s000jie98jal42tld', '9879879870', 'r@g.com', '$2b$10$q0WQ6A5WMfxz0blNid4PH.Gp7pE6UhGVrGUQnmB5qKvZML6Lx6CA.', 'Ragya', 'DOCTOR', '2025-09-11 04:58:21.495', '2025-09-11 04:59:15.148');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmff0liq10000iepgeovo5pz9', '9876987600', 'dev@g.com', '$2b$10$octI.VChlkWgCUuJPIbRqeTD04KkptsNKkPr.dJ/2upGKDhS/Y5Be', 'dev', 'DOCTOR', '2025-09-11 06:15:41.827', '2025-09-11 06:19:55.482');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfft4sps0000ief8e7od0y6h', '9013088110', 'aryan@gmail.com', '$2b$10$ysHJl.424/uySJz/H0pR3OTeBO6D02CUY/SD63FtI98QcndW5x1Cm', 'Aryan', 'DOCTOR', '2025-09-11 19:34:30.494', '2025-09-11 19:37:06.001');
INSERT INTO public."User" (id, phone, email, "passwordHash", name, role, "createdAt", "updatedAt") VALUES ('cmfkqf2ih0000ieaccd2jbu28', '9876598765', 'v@g.com', '$2b$10$anNzwcQ71Avl5CSbc5YE6OAYUJRQ0qUcIUCiI/GoYbHI9W6QaaEpS', 'Vanshika', 'DOCTOR', '2025-09-15 06:17:21.783', '2025-09-15 06:19:40.32');


--
-- Data for Name: Doctor; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Doctor" (id, "userId", specialization, "clinicName", "clinicAddress", lat, lng, bio, fee, "isActive") VALUES ('cmfdx02uy0001ieggzfsj9xcx', 'cmfdwn7zr0006iewgmwr38z0t', 'physician', 'Doctor Shuklu', 'M-BLOCK, Vikaspuri, West Delhi, Delhi, India', 28.6348059, 77.0757769, NULL, 100, true);
INSERT INTO public."Doctor" (id, "userId", specialization, "clinicName", "clinicAddress", lat, lng, bio, fee, "isActive") VALUES ('cmfdx0fmg0003iegg8xqdcs89', 'cmfdwn1tz0004iewg1k96w278', 'dermatologist', 'Doctor Piyush Hacker', 'Delhi Technological University, Shahbad Daulatpur Village, Bawana road, Sector 27, Rohini, Alipur Tehsil, North Delhi, Delhi, 110042, India', 28.7508153, 77.1162765, NULL, 0, true);
INSERT INTO public."Doctor" (id, "userId", specialization, "clinicName", "clinicAddress", lat, lng, bio, fee, "isActive") VALUES ('cmfe897ju0003ien0h71sj1is', 'cmfdwnhep0008iewgqjywkds6', 'Smart', NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO public."Doctor" (id, "userId", specialization, "clinicName", "clinicAddress", lat, lng, bio, fee, "isActive") VALUES ('cmfexv7m1000mie98g25vchd8', 'cmfexu27s000jie98jal42tld', 'Oncology', 'SARAS', 'Unity One, Rohini ', 28.611855, 77.036825, NULL, 1000, true);
INSERT INTO public."Doctor" (id, "userId", specialization, "clinicName", "clinicAddress", lat, lng, bio, fee, "isActive") VALUES ('cmff0qyfq0007iepg9b9oqyru', 'cmff0liq10000iepgeovo5pz9', 'Software', 'Devansh Clinic', 'Pragya Bhawan, Mall Rd, Sector 27, Rohini, Alipur Tehsil, North Delhi, Delhi, 110089, India', 28.7490289, 77.1205006, NULL, 100, true);
INSERT INTO public."Doctor" (id, "userId", specialization, "clinicName", "clinicAddress", lat, lng, bio, fee, "isActive") VALUES ('cmfft84p9000fief8v5rkrrfk', 'cmfft4sps0000ief8e7od0y6h', 'Dermatologist', 'Aryan Clinic', 'M-BLOCK, Vikaspuri, West Delhi, Delhi, India', 28.6348059, 77.0757769, NULL, 100, true);
INSERT INTO public."Doctor" (id, "userId", specialization, "clinicName", "clinicAddress", lat, lng, bio, fee, "isActive") VALUES ('cmfkqi1el000bieacb4zo259w', 'cmfkqf2ih0000ieaccd2jbu28', 'Psychologist', 'Vinnu Baddies', 'Park in Ajnara Grand Heritage, Grand Ajnara Heritage, Noida, Dadri, Gautam Buddha Nagar, Uttar Pradesh, India', 28.611855, 77.036825, NULL, 0, true);


--
-- Data for Name: Patient; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Patient" (id, "userId", gender, "birthYear", address, lat, lng) VALUES ('cmfdwnhep0009iewg8lmmwpsd', 'cmfdwnhep0008iewgqjywkds6', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public."Patient" (id, "userId", gender, "birthYear", address, lat, lng) VALUES ('cmfdwnnux000biewga7xeekm0', 'cmfdwnnux000aiewgbhnx4dou', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public."Patient" (id, "userId", gender, "birthYear", address, lat, lng) VALUES ('cmfdwntpj000diewgb679j1wb', 'cmfdwntpj000ciewg6gdmo1k2', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public."Patient" (id, "userId", gender, "birthYear", address, lat, lng) VALUES ('cmfe75qiv0009ie5kibfoi4zu', 'cmfe75qiv0008ie5kc6eykesv', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public."Patient" (id, "userId", gender, "birthYear", address, lat, lng) VALUES ('cmfe7hxvz0007ieyc72w7ks1u', 'cmfe7hxvz0006ieycijqk2ad2', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public."Patient" (id, "userId", gender, "birthYear", address, lat, lng) VALUES ('cmff0liq20001iepgx3cn5csl', 'cmff0liq10000iepgeovo5pz9', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public."Patient" (id, "userId", gender, "birthYear", address, lat, lng) VALUES ('cmfft4spt0001ief86n3lbgxd', 'cmfft4sps0000ief8e7od0y6h', NULL, NULL, NULL, NULL, NULL);
INSERT INTO public."Patient" (id, "userId", gender, "birthYear", address, lat, lng) VALUES ('cmfkqf2ii0001ieacis7znn6w', 'cmfkqf2ih0000ieaccd2jbu28', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: Slot; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmff0t956000aiepg5q336ewg', 'cmff0qyfq0007iepg9b9oqyru', '2025-09-11 15:30:00', '2025-09-11 16:00:00', 5, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmff0t9560008iepg4t0mmyko', 'cmff0qyfq0007iepg9b9oqyru', '2025-09-11 14:30:00', '2025-09-11 15:00:00', 5, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfe7qiep000fieyczue7tq0f', 'cmfdx02uy0001ieggzfsj9xcx', '2025-09-10 11:17:00', '2025-09-10 11:47:00', 2, 2, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfdy8xoh0006iea0x25q8a97', 'cmfdx0fmg0003iegg8xqdcs89', '2025-09-12 10:00:00', '2025-09-12 10:30:00', 2, 1, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmff0t956000biepgphi6j3rs', 'cmff0qyfq0007iepg9b9oqyru', '2025-09-11 16:00:00', '2025-09-11 16:30:00', 5, 1, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfdy7kgi0005iea008n61sca', 'cmfdx02uy0001ieggzfsj9xcx', '2025-10-12 11:00:00', '2025-10-12 12:00:00', 6, 2, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfft5t7n0006ief81oylh2zv', 'cmfdx02uy0001ieggzfsj9xcx', '2025-09-11 14:05:00', '2025-09-11 14:35:00', 1, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfdy4wla0001iea0flw0e27u', 'cmfdx02uy0001ieggzfsj9xcx', '2025-09-12 10:30:00', '2025-09-12 11:00:00', 1, 1, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfft5t7n0007ief8vnb4ngr9', 'cmfdx02uy0001ieggzfsj9xcx', '2025-09-11 14:35:00', '2025-09-11 15:05:00', 1, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfft5t7n0008ief8kw4xtm6n', 'cmfdx02uy0001ieggzfsj9xcx', '2025-09-11 15:05:00', '2025-09-11 15:35:00', 1, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfe7qiep000gieycba1rr42r', 'cmfdx02uy0001ieggzfsj9xcx', '2025-09-10 11:47:00', '2025-09-10 12:17:00', 6, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfdy8xoh0007iea0gkapu25j', 'cmfdx0fmg0003iegg8xqdcs89', '2025-09-12 10:30:00', '2025-09-12 11:00:00', 2, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfe7qiep000iieyc3cbh52ua', 'cmfdx02uy0001ieggzfsj9xcx', '2025-09-10 12:47:00', '2025-09-10 13:17:00', 5, 0, false);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfft9h7i000iief8aabkiqiq', 'cmfft84p9000fief8v5rkrrfk', '2025-09-11 14:38:00', '2025-09-11 15:08:00', 1, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfft9h7i000jief8irjwudms', 'cmfft84p9000fief8v5rkrrfk', '2025-09-11 15:08:00', '2025-09-11 15:38:00', 1, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfft9h7i000kief8n7edto2w', 'cmfft84p9000fief8v5rkrrfk', '2025-09-11 15:38:00', '2025-09-11 16:08:00', 1, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfe6zuyt0007ie5k2uk69v4o', 'cmfdx0fmg0003iegg8xqdcs89', '2025-09-10 17:00:00', '2025-09-10 17:30:00', 3, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfft9h7i000hief8w6f5ssip', 'cmfft84p9000fief8v5rkrrfk', '2025-09-11 14:08:00', '2025-09-11 14:38:00', 1, 1, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmff0t9560009iepgj6d5h8jz', 'cmff0qyfq0007iepg9b9oqyru', '2025-09-11 15:00:00', '2025-09-11 15:30:00', 5, 1, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfe6zuyt0006ie5k5ueuqbqb', 'cmfdx0fmg0003iegg8xqdcs89', '2025-09-10 16:30:00', '2025-09-10 17:00:00', 4, 2, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfkqog06000dieacrol59hm1', 'cmfkqi1el000bieacb4zo259w', '2025-09-16 06:15:00', '2025-09-16 07:00:00', 1, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfkqog05000cieac1u129ook', 'cmfkqi1el000bieacb4zo259w', '2025-09-16 05:30:00', '2025-09-16 06:15:00', 1, 0, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfdy4wl90000iea0feo29lim', 'cmfdx02uy0001ieggzfsj9xcx', '2025-09-12 10:00:00', '2025-09-12 10:30:00', 1, 1, true);
INSERT INTO public."Slot" (id, "doctorId", "startAt", "endAt", capacity, booked, "isOpen") VALUES ('cmfdy7kgi0004iea0z6qqz05c', 'cmfdx02uy0001ieggzfsj9xcx', '2025-10-12 10:00:00', '2025-10-12 11:00:00', 10, 0, false);


--
-- Data for Name: Appointment; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfdyonho000diea0w8934ems', 'cmfdwnnux000biewga7xeekm0', 'cmfdx0fmg0003iegg8xqdcs89', 'cmfdy8xoh0006iea0x25q8a97', 'BOOKED', 'VIDEO', 'cold', '2025-09-10 12:34:22.572');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfdylinl0009iea06kdowmtf', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfdy4wl90000iea0feo29lim', 'CANCELLED', 'VIDEO', 'sick', '2025-09-10 12:31:56.338');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfdymf79000biea0l7gydi8f', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfdy7kgi0005iea008n61sca', 'CANCELLED', 'VIDEO', 'very sick', '2025-09-10 12:32:38.517');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe2zx6e000qiea0vbzj3lzi', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx02uy0001ieggzfsj9xcx', NULL, 'CANCELLED', 'AUDIO', NULL, '2025-09-10 14:35:06.806');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe5771u0003ieusieuklu14', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx0fmg0003iegg8xqdcs89', 'cmfdy8xoh0006iea0x25q8a97', 'CANCELLED', 'AUDIO', NULL, '2025-09-10 15:36:45.426');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe4nr3a0001ieushnaw0exu', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfdy7kgi0005iea008n61sca', 'CANCELLED', 'AUDIO', NULL, '2025-09-10 15:21:38.277');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe30k4o0012iea01g19unt2', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx02uy0001ieggzfsj9xcx', NULL, 'CANCELLED', 'AUDIO', NULL, '2025-09-10 14:35:36.552');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe30i3z0010iea0r2cimd4t', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx02uy0001ieggzfsj9xcx', NULL, 'CANCELLED', 'AUDIO', NULL, '2025-09-10 14:35:33.935');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe30fpo000yiea0xtzxnsp9', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx02uy0001ieggzfsj9xcx', NULL, 'CANCELLED', 'AUDIO', NULL, '2025-09-10 14:35:30.829');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe30dnm000wiea03mpjdnni', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx02uy0001ieggzfsj9xcx', NULL, 'CANCELLED', 'AUDIO', NULL, '2025-09-10 14:35:28.163');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe30bb7000uiea0gb6jf18u', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx0fmg0003iegg8xqdcs89', NULL, 'CANCELLED', 'AUDIO', NULL, '2025-09-10 14:35:25.124');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe2zzyi000siea0y8nit2ij', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx0fmg0003iegg8xqdcs89', NULL, 'CANCELLED', 'AUDIO', NULL, '2025-09-10 14:35:10.41');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe69els0002iexk6he68qdy', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfdy4wl90000iea0feo29lim', 'CANCELLED', 'AUDIO', NULL, '2025-09-10 16:06:28.144');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe6cg380004iexkakes2yvy', 'cmfdwnhep0009iewg8lmmwpsd', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfdy4wla0001iea0flw0e27u', 'BOOKED', 'AUDIO', NULL, '2025-09-10 16:08:50.037');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe76bhf000bie5k0dyjs4ss', 'cmfe75qiv0009ie5kibfoi4zu', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfdy4wl90000iea0feo29lim', 'CANCELLED', 'AUDIO', NULL, '2025-09-10 16:32:03.747');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfe7lb6g0009ieycpfrdhbe0', 'cmfe7hxvz0007ieyc72w7ks1u', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfdy4wl90000iea0feo29lim', 'BOOKED', 'AUDIO', NULL, '2025-09-10 16:43:43.192');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfexlcer0001ie98032lv4li', 'cmfdwnnux000biewga7xeekm0', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfe7qiep000fieyczue7tq0f', 'BOOKED', 'AUDIO', NULL, '2025-09-11 04:51:34.803');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfexlhx00003ie98h2izlx4e', 'cmfdwnnux000biewga7xeekm0', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfdy7kgi0005iea008n61sca', 'BOOKED', 'AUDIO', NULL, '2025-09-11 04:51:41.941');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmff0ln3v0003iepgvuh27wql', 'cmff0liq20001iepgx3cn5csl', 'cmfdx0fmg0003iegg8xqdcs89', 'cmfe6zuyt0006ie5k5ueuqbqb', 'BOOKED', 'AUDIO', NULL, '2025-09-11 06:15:47.516');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmff0n5lu0005iepg43fhjh6c', 'cmff0liq20001iepgx3cn5csl', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfdy7kgi0005iea008n61sca', 'BOOKED', 'AUDIO', NULL, '2025-09-11 06:16:58.146');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmff0too0000diepgg4mq3cd2', 'cmff0liq20001iepgx3cn5csl', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfe7qiep000fieyczue7tq0f', 'BOOKED', 'AUDIO', NULL, '2025-09-11 06:22:02.784');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfft52880005ief8qp4w5jrf', 'cmfft4spt0001ief86n3lbgxd', 'cmff0qyfq0007iepg9b9oqyru', 'cmff0t956000biepgphi6j3rs', 'BOOKED', 'AUDIO', NULL, '2025-09-11 19:34:42.825');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfft4yrt0003ief8p091ysvz', 'cmfft4spt0001ief86n3lbgxd', 'cmfdx02uy0001ieggzfsj9xcx', 'cmfdy7kgi0005iea008n61sca', 'CANCELLED', 'AUDIO', NULL, '2025-09-11 19:34:38.346');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfkqf9tj0003ieacq9a0cps6', 'cmfkqf2ii0001ieacis7znn6w', 'cmfft84p9000fief8v5rkrrfk', 'cmfft9h7i000hief8w6f5ssip', 'CANCELLED', 'AUDIO', NULL, '2025-09-15 06:17:31.256');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfkqfxnb0005ieacn3on7ls8', 'cmfkqf2ii0001ieacis7znn6w', 'cmfft84p9000fief8v5rkrrfk', 'cmfft9h7i000hief8w6f5ssip', 'BOOKED', 'AUDIO', NULL, '2025-09-15 06:18:02.135');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfkqg9hp0007ieacjv2sues6', 'cmfkqf2ii0001ieacis7znn6w', 'cmff0qyfq0007iepg9b9oqyru', 'cmff0t9560009iepgj6d5h8jz', 'BOOKED', 'AUDIO', NULL, '2025-09-15 06:18:17.485');
INSERT INTO public."Appointment" (id, "patientId", "doctorId", "slotId", status, mode, reason, "createdAt") VALUES ('cmfkqgcus0009ieacc6hv8nfe', 'cmfkqf2ii0001ieacis7znn6w', 'cmfdx0fmg0003iegg8xqdcs89', 'cmfe6zuyt0006ie5k5ueuqbqb', 'BOOKED', 'AUDIO', NULL, '2025-09-15 06:18:21.844');


--
-- Data for Name: Medicine; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Medicine" (id, name, form, strength, tags) VALUES ('cmfdzhh45000giea00m3enghs', 'Paracetamol', 'tablet', '500mg', '{}');
INSERT INTO public."Medicine" (id, name, form, strength, tags) VALUES ('cmfdzhh4i000hiea0k5lz857e', 'ORS', 'sachet', NULL, '{}');
INSERT INTO public."Medicine" (id, name, form, strength, tags) VALUES ('cmfe7nju5000bieycozhn6ywc', 'combliflam', NULL, NULL, '{}');
INSERT INTO public."Medicine" (id, name, form, strength, tags) VALUES ('cmfe7ouz3000cieycx4xv2tqn', 'Combiflam', NULL, NULL, '{}');
INSERT INTO public."Medicine" (id, name, form, strength, tags) VALUES ('cmfexpt1i0004ie98sqiand8j', 'Cheston Cold', NULL, NULL, '{}');
INSERT INTO public."Medicine" (id, name, form, strength, tags) VALUES ('cmfexqc470007ie98mwllurj1', 'Diclomol', NULL, NULL, '{}');
INSERT INTO public."Medicine" (id, name, form, strength, tags) VALUES ('cmfexqnwn000aie98xxgi7jav', 'Pandy', NULL, NULL, '{}');
INSERT INTO public."Medicine" (id, name, form, strength, tags) VALUES ('cmfexrlsx000die98gjf7qu3o', 'ORS 10mg', NULL, NULL, '{}');
INSERT INTO public."Medicine" (id, name, form, strength, tags) VALUES ('cmfexrv3n000gie98khqb0025', 'ORS 20mg', NULL, NULL, '{}');
INSERT INTO public."Medicine" (id, name, form, strength, tags) VALUES ('cmfft6wta000aief8cmg7fmxi', 'ORS 30mg', NULL, NULL, '{}');
INSERT INTO public."Medicine" (id, name, form, strength, tags) VALUES ('cmfft8cyr000gief8r43isujb', 'ORS 40mg', NULL, NULL, '{}');


--
-- Data for Name: Pharmacy; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Pharmacy" (id, name, address, lat, lng, phone, "isActive") VALUES ('cmfdx2o260005iegg4cgy53jq', 'pharmacy 2', NULL, NULL, NULL, NULL, true);
INSERT INTO public."Pharmacy" (id, name, address, lat, lng, phone, "isActive") VALUES ('cmfdx2jdn0004iegg3dle4pjt', 'pharmacy 1', 'Vikaspuri, West Delhi, Delhi, India', 28.638643, 77.0731382, '9013088110', true);
INSERT INTO public."Pharmacy" (id, name, address, lat, lng, phone, "isActive") VALUES ('cmfe67j6n0000iexktx06f6sy', 'Pharmacy 3', '', NULL, NULL, NULL, true);
INSERT INTO public."Pharmacy" (id, name, address, lat, lng, phone, "isActive") VALUES ('cmfe7m8j1000aieyckvtrqtz0', 'DTU', 'Delhi Technological University, Shahbad Daulatpur Village, Bawana road, Sector 27, Rohini, Alipur Tehsil, North Delhi, Delhi, 110042, India', 28.63534502604768, 77.07598010496093, '9876543210', true);
INSERT INTO public."Pharmacy" (id, name, address, lat, lng, phone, "isActive") VALUES ('cmfft7pba000dief8ypw7163x', 'Sample', NULL, NULL, NULL, NULL, true);


--
-- Data for Name: PharmacyAdmin; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."PharmacyAdmin" (id, "userId", "pharmacyId") VALUES ('cmfdx49ph0007ieggbt1cznr7', 'cmfdwllq40000iewgetrt3gr0', 'cmfdx2jdn0004iegg3dle4pjt');
INSERT INTO public."PharmacyAdmin" (id, "userId", "pharmacyId") VALUES ('cmfdx4p7o0009ieggp1cb28dg', 'cmfdwms360002iewg9iwq3vd0', 'cmfdx2o260005iegg4cgy53jq');
INSERT INTO public."PharmacyAdmin" (id, "userId", "pharmacyId") VALUES ('cmfe88tx90001ien0t8ii5bxe', 'cmfe7hxvz0006ieycijqk2ad2', 'cmfe7m8j1000aieyckvtrqtz0');


--
-- Data for Name: PharmacyInventory; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."PharmacyInventory" (id, "pharmacyId", "medicineId", "stockQty", price, "updatedAt") VALUES ('cmfe7ov04000eieycx089r18l', 'cmfdx2jdn0004iegg3dle4pjt', 'cmfe7ouz3000cieycx4xv2tqn', 100, 50, '2025-09-10 16:46:28.852');
INSERT INTO public."PharmacyInventory" (id, "pharmacyId", "medicineId", "stockQty", price, "updatedAt") VALUES ('cmfdzhh4s000jiea0kzz8zfub', 'cmfdx2jdn0004iegg3dle4pjt', 'cmfdzhh45000giea00m3enghs', 30, 120, '2025-09-11 04:54:31.042');
INSERT INTO public."PharmacyInventory" (id, "pharmacyId", "medicineId", "stockQty", price, "updatedAt") VALUES ('cmfexpt2r0006ie988swo4v86', 'cmfdx2jdn0004iegg3dle4pjt', 'cmfexpt1i0004ie98sqiand8j', 100, 10, '2025-09-11 04:55:03.027');
INSERT INTO public."PharmacyInventory" (id, "pharmacyId", "medicineId", "stockQty", price, "updatedAt") VALUES ('cmfexqc5c0009ie98e6jgsyjg', 'cmfdx2jdn0004iegg3dle4pjt', 'cmfexqc470007ie98mwllurj1', 100, 100, '2025-09-11 04:55:27.744');
INSERT INTO public."PharmacyInventory" (id, "pharmacyId", "medicineId", "stockQty", price, "updatedAt") VALUES ('cmfexqnxm000cie98bu8oc5sr', 'cmfdx2jdn0004iegg3dle4pjt', 'cmfexqnwn000aie98xxgi7jav', 90, 10, '2025-09-11 04:55:43.018');
INSERT INTO public."PharmacyInventory" (id, "pharmacyId", "medicineId", "stockQty", price, "updatedAt") VALUES ('cmfexrlt8000fie981x9s1s2h', 'cmfdx2jdn0004iegg3dle4pjt', 'cmfexrlsx000die98gjf7qu3o', 40, 100, '2025-09-11 04:56:26.924');
INSERT INTO public."PharmacyInventory" (id, "pharmacyId", "medicineId", "stockQty", price, "updatedAt") VALUES ('cmfexrv4p000iie98pa5cb3if', 'cmfdx2jdn0004iegg3dle4pjt', 'cmfexrv3n000gie98khqb0025', 50, 120, '2025-09-11 04:56:39.001');
INSERT INTO public."PharmacyInventory" (id, "pharmacyId", "medicineId", "stockQty", price, "updatedAt") VALUES ('cmfdzhh4s000liea09fkxhnz9', 'cmfdx2jdn0004iegg3dle4pjt', 'cmfdzhh4i000hiea0k5lz857e', -9, 102, '2025-09-11 19:35:56.375');
INSERT INTO public."PharmacyInventory" (id, "pharmacyId", "medicineId", "stockQty", price, "updatedAt") VALUES ('cmfft6wte000cief8lztr4dkq', 'cmfdx2jdn0004iegg3dle4pjt', 'cmfft6wta000aief8cmg7fmxi', 100, 130, '2025-09-11 19:36:09.123');


--
-- Data for Name: Prescription; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: PrescriptionItem; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Session" (id, "appointmentId", "joinCode", "startedAt", "endedAt") VALUES ('cmfdyxf7o000fiea000nyhdq5', 'cmfdylinl0009iea06kdowmtf', 'QPH797', NULL, NULL);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('4c1d31bb-36f7-466f-9593-5a03de5ea4f3', '88eb5197a8ec31a2913cb408361db40c32101db6403fbda5b74697f56248d7a1', '2025-09-10 15:01:45.365133+05:30', '20250910093145_init', NULL, NULL, '2025-09-10 15:01:45.240863+05:30', 1);


--
-- PostgreSQL database dump complete
--

