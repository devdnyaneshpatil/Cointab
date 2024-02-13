import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: { city: string };
  company: { name: string };
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: User[] = [];
  url = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  fetchUsers() {
    this.http.get<User[]>(this.url).subscribe(
      (data) => {
        this.users = data;
        this.displayData();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  displayData() {
    const mainContainer = document.getElementById('main-container');
    if (!mainContainer) return;
    mainContainer.innerHTML = '';
    this.users.forEach((user) => {
      const card = document.createElement('div');
      card.setAttribute('data-email', user.email);
      card.setAttribute('data-name', user.name);
      card.setAttribute('data-phone', user.phone);
      card.setAttribute('data-website', user.website);
      card.setAttribute('data-city', user.address.city);
      card.setAttribute('data-company', user.company.name);
      card.classList.add('card');

      const nameEl = document.createElement('h3');
      nameEl.classList.add('name');
      nameEl.innerText = user.name;

      const emailEl = document.createElement('h4');
      emailEl.classList.add('email');
      emailEl.innerText = user.email;

      const phoneEl = document.createElement('p');
      phoneEl.classList.add('phone');
      phoneEl.innerText = user.phone;

      const webEl = document.createElement('p');
      webEl.classList.add('web');
      webEl.innerText = user.website;

      const cityEl = document.createElement('p');
      cityEl.classList.add('city');
      cityEl.innerText = user.address.city;

      const companyEl = document.createElement('p');
      companyEl.classList.add('company');
      companyEl.innerText = user.company.name;

      const addEl = document.createElement('button');
        const payload = {
          name: card.getAttribute("data-name"),
          email: card.getAttribute("data-email"),
          phone: card.getAttribute("data-phone"),
          website: card.getAttribute("data-website"),
          city: card.getAttribute("data-city"),
          company: card.getAttribute("data-company"),
        };
        fetch(`http://localhost:8080/users/${payload.email}`)
          .then((res) => res.json())
          .then((data) => {
            addEl.innerText = data.msg;
            addEl.classList.add(data.msg);
          })
          .catch((error) => {
            console.log("error fetching data", error.message);
          });

        addEl.addEventListener("click", () => {
          if (addEl.classList.contains("Add")) {
            console.log("add");
            fetch("http://localhost:8080/users/add", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(payload),
            })
              .then((res) => res.json())
              .then((data) => {
                addEl.innerText = data.msg;
                addEl.classList.add(data.msg);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("Open");
          }
        });

      card.append(nameEl, emailEl, phoneEl, webEl, cityEl, companyEl, addEl);

      mainContainer.appendChild(card);
    });
  }
}
