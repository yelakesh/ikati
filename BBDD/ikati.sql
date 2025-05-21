-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 21-05-2025 a las 08:39:16
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ikati`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `contrasena` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `usuario`, `contrasena`) VALUES
(4, 'Campos', '123'),
(5, '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animales`
--

CREATE TABLE `animales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `animales`
--

INSERT INTO `animales` (`id`, `nombre`) VALUES
(4, 'Conejos y Roedores'),
(2, 'Gato'),
(3, 'Pájaro'),
(1, 'Perro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aviso_stock`
--

CREATE TABLE `aviso_stock` (
  `id_producto` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carro`
--

CREATE TABLE `carro` (
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` date DEFAULT curdate(),
  `id_cupon` int(11) DEFAULT NULL,
  `importe` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra_producto`
--

CREATE TABLE `compra_producto` (
  `id_compra` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `descuento` double DEFAULT NULL,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cupones`
--

CREATE TABLE `cupones` (
  `id` int(11) NOT NULL,
  `codigo` varchar(20) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  `descuento` double DEFAULT NULL,
  `tipo_descuento` enum('porcentaje','fijo') DEFAULT NULL,
  `fecha_expiracion` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `filtros`
--

CREATE TABLE `filtros` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_filtro` int(11) NOT NULL,
  `valor` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `filtros`
--

INSERT INTO `filtros` (`id`, `id_producto`, `id_filtro`, `valor`) VALUES
(59, 98, 3, 'Salmón'),
(60, 99, 2, 'pequeño'),
(61, 100, 5, 'Gris'),
(62, 101, 3, 'Frutas'),
(64, 102, 2, 'Grande'),
(65, 103, 2, 'pequeño'),
(67, 104, 5, 'Gris'),
(79, 105, 2, 'grande'),
(80, 105, 5, 'amarillo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `nombre` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `id_producto`, `nombre`) VALUES
(98, 98, 'imagenes-1747738683997-591706277.jpg'),
(99, 99, 'imagenes-1747744649828-244956136.jpg'),
(100, 99, 'imagenes-1747744649830-624865341.jpg'),
(101, 99, 'imagenes-1747744649837-544730445.jpg'),
(102, 99, 'imagenes-1747744649838-358879007.webp'),
(103, 100, 'imagenes-1747746560897-30882705.jpg'),
(104, 100, 'imagenes-1747746560899-601184687.webp'),
(105, 100, 'imagenes-1747746560900-697025201.jpg'),
(106, 101, 'imagenes-1747766135012-392600920.jpg'),
(110, 102, 'imagenes-1747774454772-112488977.jpg'),
(111, 102, 'imagenes-1747774454772-492676984.jpg'),
(112, 102, 'imagenes-1747774454773-859116402.jpg'),
(113, 103, 'imagenes-1747774979143-424580191.webp'),
(114, 104, 'imagenes-1747776711253-896814027.jpg'),
(115, 104, 'imagenes-1747776711255-570991767.jpg'),
(116, 104, 'imagenes-1747776711256-872283537.jpg'),
(117, 104, 'imagenes-1747776711256-940659731.jpg'),
(118, 105, 'imagenes-1747807367965-638780237.jpg'),
(119, 105, 'imagenes-1747807367967-246556214.jpg'),
(120, 105, 'imagenes-1747807367968-779695911.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id`, `nombre`, `imagen`) VALUES
(1, 'Seresto', 'Seresto.png'),
(2, 'Frontline', 'Frontline.png'),
(3, 'Acana Classic', 'Acana_Classic.png'),
(4, 'Advance', 'Advance.png'),
(5, 'Dogxtreme', 'Dogxtreme.jpg'),
(6, 'Royal Canin', 'RoyalCanin.png'),
(7, 'Dogzilla', 'Dogzilla.png'),
(8, 'Outech', 'Outech.png'),
(9, 'Vitakraft', 'Vitakraft.png'),
(10, 'Felix', 'Felix.png'),
(11, 'True Origins', 'True_origins.jpeg'),
(12, 'Greenies', 'Greenies.png'),
(13, 'Catshion', ''),
(14, 'Small Life', 'Smalllife.png'),
(15, 'Versele', 'versele.png'),
(16, 'Wild Mouse', 'wildmouse.png'),
(17, 'Kong', 'kong.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  `id_animal` int(11) DEFAULT NULL,
  `id_marca` int(11) DEFAULT NULL,
  `id_tipo` int(11) DEFAULT NULL,
  `descuento` decimal(10,2) DEFAULT NULL,
  `valoracion` decimal(2,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `activo`, `id_animal`, `id_marca`, `id_tipo`, `descuento`, `valoracion`) VALUES
(98, 'True Origins Wild Adult Pacific Salmón pienso para perros', '<p>Pienso con prebioticos, sin cereales y sabor a salmón para perros adultos.</p><h2>Comida seca rica en salmón para mantener a tu perro adulto saludable</h2><p>El <strong>pienso para perros </strong>Pacific Adult ha sido formulado para cubrir todas las necesidades de los perros adultos y contribuir a su óptimo desarrollo para que crezcan sanos y fuertes.<br>Alimento completo para perros adultos, rico en salmón, un pescado que cuenta con cantidad de propiedades beneficiosas para el organismo. Es una fuente excepcional de proteínas y un aporte de ácidos grasos Omega 3 y Omega 6, que ayudan a reducir los niveles de colesterol y al fortalecimiento de huesos y articulaciones. El consumo de alimentos ricos en Omega 3, como el salmón, ayudan al fortalecimiento del sistema inmunológico y favorecen el mantenimiento de la piel y el pelo sanos.<br>La fruta y verdura son una excelente fuente de minerales y vitaminas, actuando como antioxidantes naturales y ayudando a conservar el sistema inmunitario de tu perro en pleno funcionamiento.</p><p>•&nbsp;&nbsp; &nbsp;La combinación de<strong> fuentes naturales de proteínas</strong> y favorece una alta digestibilidad.<br>•&nbsp;&nbsp; &nbsp;<strong>Prebioticos</strong>: Estimulación de la microflora intestinal.&nbsp;<br>•&nbsp;&nbsp; &nbsp;<strong>Cáscaras de crustáceos </strong>y extracto de cartílago: Ayudan a mantener fuertes los huesos, las articulaciones y los tendones y favorecen a la movilidad.<br>•&nbsp;&nbsp;&nbsp;<strong> Garbanzos</strong>: Fuente natural de proteínas y minerales, como sodio, magnesio, hierro, calcio, los cuales, son necesarios para fortalecer los huesos.<br>•&nbsp;&nbsp; &nbsp;<strong>Omega 3: </strong>Incluye aceite de salmón, rico en omega 3, para el cuidado de la piel y el pelaje.</p><p><strong>Composición</strong><i><strong>:&nbsp;</strong></i>Salmón deshidratado (25 %), pescado blanco deshidratado (18 %), aceite de salmón (12 %), salmón fresco (10 %), patatas (10 %), guisantes (10 %), proteína de salmón hidrolizada (3 %), pulpa de manzana deshidratada (3%), calabaza (3%), huevos hidrolizados (2%), zanahorias (1%), linaza (1%), garbanzos (1%), cáscaras de crustáceos hidrolizados (fuente de glucosamina, 0,026%) , extracto de cartílago (fuente de condroitina, 0,016%), levadura de cerveza (fuente de manano-oligosacáridos, 0,015%), raíz de achicoria seca (fuente de fructo-oligosacáridos, 0,01%), yucca schidigera (0,01%) , algas secas (0,01%), romero seco (0,01%)</p>', 1, 1, 11, 5, 0.00, 3.5),
(99, 'Greenies Teenie Snacks Dentales Naturales para perros pequeños', '<p>Snacks para perros de razas pequeñas de 2 a 7kg, elaborado para lograr una salud dental completa de tu mascota.</p><h2>Deliciosos snacks dentales para perros</h2><p>Greenies actúa eficazmente en cuatro frentes clave para la higiene oral: el sarro, la placa, el mal aliento y la salud de las encías. El Consejo de la Salud oral veterinaria en USA lo aprueba como el complemento para controlar el sarro y la placa.</p><p><strong>Características:</strong></p><ul><li>Proporciona unas encías sanas.&nbsp;</li><li>Gran palatabilidad, altamente soluble y digestible.&nbsp;</li><li>Reduce el sarro, la placa bacteriana y el mal aliento.&nbsp;</li><li>Creados en base a la forma de la mandíbula y la mordida.&nbsp;</li><li>Fabricado para ajustarse a los hábitos de masticación de los perros.&nbsp;</li></ul>', 1, 1, 12, 7, 0.00, 4.0),
(100, 'Catshion Pole Rascador Gris para gatos', '<p>Rascador gris en varios tamaños de color gris de la marca Catshion.</p><h2>Rascador para gatos Catshion Pole</h2><p>El Rascador para Gatos Catshion es un accesorio esencial que tu gato amará. Este poste rascador no solo permite a tu felino afilar sus uñas de forma segura, sino que también le brinda diversión y estimula sus instintos naturales. Además, protege tus muebles, cortinas, alfombras y paredes de posibles daños causados por las afiladas garras de tu compañero peludo.</p><p>&nbsp;</p><p>El Rascador Catshion combina un diseño elegante con colores neutros que se integran armoniosamente en tu hogar. Su tamaño compacto garantiza que ocupe muy poco espacio, y su facilidad de limpieza lo convierte en la elección perfecta para mantener tu casa en orden.</p>', 1, 2, 13, 14, 10.00, 3.0),
(101, 'Small Life Barritas de Frutas para conejos', '<p>Golosinas en forma de barras hechas de frutas para tus conejos de la marca Small Life.</p><h2>Tentempié para conejos de Small Life</h2><p>Este<strong> snack para conejos</strong> de <strong>Small Life</strong> está elaborado con un rico<strong> sabor a frutas</strong> para que tu mascota pueda obtener todos los nutrientes y vitaminas que necesita para mantenerse estable y sano en su vida.</p><p><strong>Tiene forma de barras</strong> para que se le resulte mucho más<strong> fácil de digerir</strong> a la hora de morderlo. Además,<strong> posee unos ganchos</strong> para que puedas colgarlo en la jaula de tu gran amigo para que se le complique la acción de masticarlos.</p>', 1, 4, 14, 7, 0.00, 5.0),
(102, 'Royal Canin Maxi Adult pienso para perros', '<p>Pienso para perros adultos de razas grandes que minimiza los efectos del envejecimiento y mejora la salud articular.</p><h2>Pienso para perros de&nbsp;Royal Canin</h2><p>Royal Canin Maxi Adult es el alimento indicado para aquellos perros que en edad adulta alcanzan más de 25 kg gracias a su receta, creada especialmente para mantener su organismo en un estado óptimo.</p>', 1, 1, 6, 5, 0.00, 2.7),
(103, 'Versele-Laga Prestige Premium Mix African pienso para loros pequeños', '<p>Alimento para loros pequeños. Se ha elaborado con una mezcla de ingredientes de la mejor calidad.</p><p>El alimento de Versele Laga es perfecto para loros pequeños.<br><br><strong>Características:</strong></p><ul><li>Mezcla de ingredientes desarollada por expertos veterinarios y nutricionistas.</li><li>Alimento de excelente calidad.</li><li>Envasado en atmósfera modificada libre de oxígeno.</li></ul>', 1, 3, 15, 13, 0.00, 4.9),
(104, 'Juguete Wild Mouse con sonido y LED para gatos', '<p>El ratón de juguete Wild Mouse parece tan real que despertará el instinto cazador y las ganas de jugar de tu gato. La <strong>voz aguda de microchip y los ojos rojos iluminados</strong> imitan increíblemente bien el comportamiento y el aspecto de un ratón.</p><p>Este juguete tiene un pelaje artificial que resulta muy agradable para las patitas de tu gato. Además, este ratón salvaje reacciona con sonido y luz LED a los movimientos, por lo que entretiene y sorprende siempre a tu gato.</p><p>Gracias a su aspecto natural y al sonido que emite, cada gato se convertirá en un auténtico cazador. Después de jugar, tu gato puede acurrucarse cómodamente con este suave juguete.</p>', 1, 2, 16, 12, 0.00, 4.2),
(105, 'KONG AirDog Squeakair pelotas para perros', '<p>Para perros que no se conforman con una simple pelota de tenis le ofrecemos esta pelota con sonido.</p><p>El material de la pelota es suficientemente robusto como para resistir las mordeduras y, además, no daña la dentadura del perro.</p>', 1, 1, 17, 12, 0.00, 3.9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `latitud` decimal(10,8) NOT NULL,
  `longitud` decimal(11,8) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `web` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_filtro`
--

CREATE TABLE `tipos_filtro` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_filtro`
--

INSERT INTO `tipos_filtro` (`id`, `nombre`) VALUES
(1, 'Novedades'),
(2, 'Tamaño de la mascota'),
(3, 'Sabores'),
(4, 'Material'),
(5, 'Color');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_variacion`
--

CREATE TABLE `tipos_variacion` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_variacion`
--

INSERT INTO `tipos_variacion` (`id`, `tipo`) VALUES
(4, 'Color'),
(5, 'Formato'),
(2, 'Peso'),
(1, 'Talla'),
(3, 'Tamaño');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_producto`
--

CREATE TABLE `tipo_producto` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_producto`
--

INSERT INTO `tipo_producto` (`id`, `tipo`) VALUES
(3, 'Collar Antiparasitario'),
(11, 'Comedero/bebedero'),
(6, 'Comida húmeda'),
(10, 'Jaula'),
(12, 'Juguetes'),
(9, 'Lecho'),
(13, 'Pienso'),
(5, 'Pienso seco'),
(4, 'Pipetas Antiparasitarias'),
(14, 'Rascadores'),
(7, 'Snacks'),
(8, 'Transportín');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido1` varchar(50) NOT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `cp` varchar(10) NOT NULL,
  `direccion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido1`, `apellido2`, `usuario`, `contrasena`, `email`, `telefono`, `cp`, `direccion`) VALUES
(41, 'Juan', 'Lopez', 'Herrero', 'JLH', '123', 'JLH@gmail.com', '666666666', '28050', 'General Margallo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variantes`
--

CREATE TABLE `variantes` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `id_variacion` int(11) NOT NULL,
  `valor_variacion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `variantes`
--

INSERT INTO `variantes` (`id`, `id_producto`, `precio`, `stock`, `id_variacion`, `valor_variacion`) VALUES
(66, 98, 6.99, 50, 2, '500gr'),
(67, 98, 24.99, 40, 2, '3kg'),
(68, 98, 67.99, 20, 2, '12kg'),
(69, 99, 5.69, 40, 5, '11 barritas'),
(70, 99, 9.99, 34, 5, '22 barritas'),
(71, 99, 15.89, 23, 5, '43 barritas'),
(72, 100, 19.99, 5, 3, 'Normal'),
(73, 101, 2.29, 35, 5, '2 barritas'),
(74, 101, 12.64, 54, 5, '12 barritas'),
(77, 102, 26.99, 12, 2, '4 kg'),
(78, 102, 62.49, 20, 2, '15 kg'),
(79, 103, 6.49, 20, 5, '1 kg'),
(81, 104, 2.99, 100, 5, '1 unidad'),
(86, 105, 7.49, 50, 5, '2 uds');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`usuario`);

--
-- Indices de la tabla `animales`
--
ALTER TABLE `animales`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `aviso_stock`
--
ALTER TABLE `aviso_stock`
  ADD PRIMARY KEY (`id_producto`,`email`);

--
-- Indices de la tabla `carro`
--
ALTER TABLE `carro`
  ADD PRIMARY KEY (`id_usuario`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cupon` (`id_cupon`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `compra_producto`
--
ALTER TABLE `compra_producto`
  ADD PRIMARY KEY (`id_compra`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `cupones`
--
ALTER TABLE `cupones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `filtros`
--
ALTER TABLE `filtros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_filtro` (`id_filtro`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `id_animal` (`id_animal`,`id_marca`,`id_tipo`),
  ADD KEY `id_tipo` (`id_tipo`),
  ADD KEY `id_marca` (`id_marca`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_filtro`
--
ALTER TABLE `tipos_filtro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_variacion`
--
ALTER TABLE `tipos_variacion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- Indices de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- Indices de la tabla `variantes`
--
ALTER TABLE `variantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_variacion` (`id_variacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `animales`
--
ALTER TABLE `animales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cupones`
--
ALTER TABLE `cupones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `filtros`
--
ALTER TABLE `filtros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipos_filtro`
--
ALTER TABLE `tipos_filtro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipos_variacion`
--
ALTER TABLE `tipos_variacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `variantes`
--
ALTER TABLE `variantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aviso_stock`
--
ALTER TABLE `aviso_stock`
  ADD CONSTRAINT `aviso_stock_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `carro`
--
ALTER TABLE `carro`
  ADD CONSTRAINT `carro_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carro_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`id_cupon`) REFERENCES `cupones` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `compra_producto`
--
ALTER TABLE `compra_producto`
  ADD CONSTRAINT `compra_producto_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `compra_producto_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `filtros`
--
ALTER TABLE `filtros`
  ADD CONSTRAINT `filtros_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `filtros_ibfk_2` FOREIGN KEY (`id_filtro`) REFERENCES `tipos_filtro` (`id`);

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_animal`) REFERENCES `animales` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_producto` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `variantes`
--
ALTER TABLE `variantes`
  ADD CONSTRAINT `variantes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `variantes_ibfk_2` FOREIGN KEY (`id_variacion`) REFERENCES `tipos_variacion` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
