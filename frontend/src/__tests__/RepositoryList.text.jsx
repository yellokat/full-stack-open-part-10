import {RepositoryListContainer} from "../pages/RepositoryPage/RepositoryListPage";
import {act, render, screen, waitFor, within} from "@testing-library/react-native";


describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // render component
      const repositoryNodes = repositories.edges.map(edge => edge.node)
      const onPressed = jest.fn();
      render(<RepositoryListContainer repositories={repositoryNodes} onPressed={onPressed} pickerMenu={<></>}/>);

      // expect 2 list items
      const items = screen.getAllByTestId('repositoryItem')
      await waitFor(() => {
        expect(items).toHaveLength(2);
      });

      const stars = within(items[0]).getAllByTestId("repositoryStatStars")
      const allStars = screen.getAllByTestId('repositoryStatStars')
      expect(allStars).toHaveLength(2);
      expect(stars).toHaveLength(1);

      // ========================================================================
      // Test item 1
      // ========================================================================

      // expect 4 list item stats
      const stars1 = within(items[0]).getByTestId("repositoryStatStars")
      const forks1 = within(items[0]).getByTestId("repositoryStatForks")
      const reviews1 = within(items[0]).getByTestId("repositoryStatReviews")
      const rating1 = within(items[0]).getByTestId("repositoryStatRating")

      // check values
      expect(stars1).toHaveTextContent(/Stars/)
      expect(stars1).toHaveTextContent(/21.8k/)

      expect(forks1).toHaveTextContent(/Forks/)
      expect(forks1).toHaveTextContent(/1.6k/)

      expect(reviews1).toHaveTextContent(/Reviews/)
      expect(reviews1).toHaveTextContent(/3/)

      expect(rating1).toHaveTextContent(/Rating/)
      expect(rating1).toHaveTextContent(/88/)

      // ========================================================================
      // Test item 2
      // ========================================================================

      // expect 4 list item stats
      const stars2 = within(items[1]).getByTestId("repositoryStatStars")
      const forks2 = within(items[1]).getByTestId("repositoryStatForks")
      const reviews2 = within(items[1]).getByTestId("repositoryStatReviews")
      const rating2 = within(items[1]).getByTestId("repositoryStatRating")

      // check values
      expect(stars2).toHaveTextContent(/Stars/)
      expect(stars2).toHaveTextContent(/1.7k/)

      expect(forks2).toHaveTextContent(/Forks/)
      expect(forks2).toHaveTextContent(/69/)

      expect(reviews2).toHaveTextContent(/Reviews/)
      expect(reviews2).toHaveTextContent(/3/)

      expect(rating2).toHaveTextContent(/Rating/)
      expect(rating2).toHaveTextContent(/72/)
    });
  });
});