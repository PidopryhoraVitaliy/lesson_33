/* Задания на урок 31:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

/* Задания на урок 30:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

	const movieDB = {
		movies: [
			"Логан 2",
			"Лига справедливости 2",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против всех"
		]
	};

	document.querySelectorAll('.promo__adv').forEach(
		elem => elem.remove()
	);
	document.querySelectorAll('.promo__genre').forEach(
		elem => elem.textContent = 'Драма'
	);
	document.querySelectorAll('.promo__bg').forEach(
		elem => elem.style.backgroundImage = 'url(./img/bg.jpg)'
	);

	const	list = document.querySelector('.promo__interactive-list'),
			checkboxFavorite = document.querySelector('[type="checkbox"]');

	showMovies(list, movieDB.movies);

	function clearMovies(list) {
		
		/*document.querySelectorAll('.promo__interactive-item').forEach(
			elem => elem.remove()
		);*/
		list.innerHTML = '';
		
	};

	function showMovies(list, movies) {
		
		const maxfilmNameLength = 21;
		
		clearMovies(list);
		
		movies.sort();
		
		movies.forEach((item, index) => {
			
			//console.log(index + 1, item);
			
			let shortFilmName = item;
			if (shortFilmName.length > maxfilmNameLength) {
				shortFilmName = shortFilmName.substr(0, maxfilmNameLength) + '...';
			};
			
			list.innerHTML += `
				<li class="promo__interactive-item" data-film-name="${item}">${index + 1} ${shortFilmName}
					<div class="delete"></div>
				</li>
			`;
			
			/*const li = document.createElement('li');
			li.classList.add('promo__interactive-item');
			li.textContent = `${index + 1} ${item}`;
			list.append(li);
			
			const divDelete = document.createElement('div');
			divDelete.classList.add('delete');
			li.append(divDelete);*/
			
		});
		
		document.querySelectorAll('.delete').forEach(
			elem => elem.addEventListener('click', (event) => {
				
				const	li = event.target.parentElement,
						filmName = li.dataset.filmName,
						filmIndex = movieDB.movies.indexOf(filmName);
						
				if (filmIndex == -1) {
					console.log('error: ');
					console.log('filmName: ' + filmName);
					console.log('filmIndex: ' + filmIndex);
					return;
				};
						
				movieDB.movies.splice(filmIndex, 1);
				showMovies(list, movieDB.movies);
				
			})
		);

	};

	document.querySelector('button').addEventListener('click', (event) => {
		
		event.preventDefault();
		
		const	inputElem = document.querySelector('.adding__input'),
				filmName = inputElem.value,
				favorite = checkboxFavorite.checked;
		
		if (filmName == '') {
			alert('Введите название фильма!');
			return;
		};
		
		if (favorite) {
			console.log('Добавляем любимый фильм!');
		};

		movieDB.movies.push(filmName);
		inputElem.value = '';
		
		showMovies(list, movieDB.movies);
		
		//console.log(filmName);
		
	});

});












