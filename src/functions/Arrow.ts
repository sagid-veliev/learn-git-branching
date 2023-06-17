export default function drawArrow(context: any, x1: number, y1: number, x2: number, y2: number) {
    // Рисуем линию от хвоста к голове
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();

    // Рисуем голову стрелки
    const arrowHeadSize = 10; // Размер головы стрелки

    // Вычисляем угол между линией и осью X
    const angle = Math.atan2(y2 - y1, x2 - x1);

    // Вычисляем координаты точек для рисования треугольника головы стрелки
    const arrowX = x2 - arrowHeadSize * Math.cos(angle);
    const arrowY = y2 - arrowHeadSize * Math.sin(angle);

    context.beginPath();
    context.moveTo(arrowX, arrowY);
    context.lineTo(arrowX + arrowHeadSize * Math.cos(angle - Math.PI / 2), arrowY + arrowHeadSize * Math.sin(angle - Math.PI / 2));
    context.lineTo(arrowX + arrowHeadSize * Math.cos(angle + Math.PI / 2), arrowY + arrowHeadSize * Math.sin(angle + Math.PI / 2));
    context.closePath();
    context.fill();
}
