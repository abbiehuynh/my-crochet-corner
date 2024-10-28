--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


--
-- USERS -- ONE-TO-MANY --> PROJECTS
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL, 
    username VARCHAR(255), 
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pronouns VARCHAR(255),
    bio VARCHAR(255),
    profile_picture VARCHAR(255)
);

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

--
-- Insert Values into users table; these are example values, please make your own!
INSERT INTO public.users(name, email, password, pronouns, bio, profile_picture) 
 VALUES 
    ('Abbie', 'ahuynh', 'abbiehuynhh@gmail.com', '*enter your password*', 'she/her', 'I love to crochet!', '' ),
    ('Midnight', 'coolcat', 'midnight@yahoo.com', '*enter your password*', 'he/him', 'String is cool.', '');


--
-- PROJECTS
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    project_name VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_at TIMESTAMP,
    time_to_complete INTERVAL, 
    project_status VARCHAR(255),
    project_type VARCHAR(255),
    is_favorite BOOLEAN,
    notes TEXT,
    sentiment_score FLOAT,
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

    --
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;

--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);

--
-- Insert Values into projects table
INSERT INTO public.projects(user_id, project_name, time_to_complete, project_status, project_type, is_favorite, notes) 
 VALUES 
    (1, 'bunny with headphones', '2 hours', 'completed', 'amigurimi', true, 'requires a good bit of sewing, but I really love how it turned out!'),
    (1, 'star blanket', '8 months', 'in progress', 'blanket', true, 'really like how it is turning out, just can not get myself to complete it. I keep making it larger'),
    (1, 'black cat', '3 days', 'completed', 'tapestry', false, 'first time trying tunisian crochet to make a tapestry. I liked how this looks better than sc with a regular crochet hook, but it hurts my hands ALOT.');


--
-- YARN -- MANY-TO-ONE -> PROJECTS
-- Name: yarn; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.yarn (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    yarn_brand VARCHAR(255),
    yarn_type VARCHAR(255),
    yarn_weight VARCHAR(255),
    recommended_hook_size VARCHAR(255),
    yarn_color VARCHAR(255),
    hook_size VARCHAR(255),
    FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE
);

--
-- Name: yarn_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.yarn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: yarn_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.yarn_id_seq OWNED BY public.yarn.id;

--
-- Name: yarn id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.yarn ALTER COLUMN id SET DEFAULT nextval('public.yarn_id_seq'::regclass);

--
-- Insert Values into yarn table
INSERT INTO public.yarn(project_id, yarn_brand, yarn_type, yarn_weight, recommended_hook_size, yarn_color, hook_size) 
 VALUES 
    (2, 'Loops and Threads Soft Classic', 'Acrylic', 'Medium (4)', '5.5mm', 'Sage', '4mm'),
    (2, 'Loops and Threads Soft Classic', 'Acrylic', 'Medium (4)', '5.5mm', 'White', '4mm'),
    (2, 'Loops and Threads Soft Classic', 'Acrylic', 'Medium (4)', '5.5mm', 'Black', '4mm');

--
-- PATTERN -- ONE TO MANY -> PROJECTS
-- Name: pattern; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pattern (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    pattern_name VARCHAR(255), 
    pattern_by VARCHAR(255),
    pattern_url VARCHAR(255),
    FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE
);

--
-- Name: pattern_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pattern_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

    --
-- Name: pattern_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pattern_id_seq OWNED BY public.pattern.id;

--
-- Name: pattern id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pattern ALTER COLUMN id SET DEFAULT nextval('public.pattern_id_seq'::regclass);

--
-- Insert Values into pattern table
INSERT INTO public.pattern(project_id, pattern_name, pattern_by, pattern_url) 
 VALUES 
    (2, 'bunny with hat', 'bondinbuds', 'to be added');

--
-- OTHER MATERIALS -- MANY-TO-ONE -> PROJECTS
-- Name: other_materials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.other_materials (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    hook_size VARCHAR(50),
    safety_eyes VARCHAR(100),
    stuffing VARCHAR(100),
    FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE
);

--
-- Name: other_materials_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.other_materials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: other_materials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.other_materials_id_seq OWNED BY public.other_materials.id;

--
-- Name: other_materials id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.other_materials ALTER COLUMN id SET DEFAULT nextval('public.other_materials_id_seq'::regclass);

--
-- Insert Values into other_materials table
INSERT INTO public.other_materials(project_id, hook_size, safety_eyes, stuffing) 
 VALUES 
    (2, '4mm', '10mm', '50 grams');

--
-- IMAGES -- MANY-TO-ONE -> PROJECTS
-- Name: images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.images (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    image_url VARCHAR(255),
    image_name VARCHAR(100),
    image_description VARCHAR(255),
    FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE
);

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;

--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);

--
-- Insert Values into images table
-- update other tables to have an imageID array to reference images
INSERT INTO public.images(project_id, image_url, image_name, image_description) 
 VALUES 
    ()