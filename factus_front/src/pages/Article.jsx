import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Article.css";
import {
  Button,
  Switch,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Box,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

const Article = () => {
  const location = useLocation();
  const articleData = location?.state?.article;
  const [commentText, setCommentText] = React.useState("");
  const [isContributionPositive, setIsContributionPositive] =
    React.useState(false);
  const [sliderValue, setSliderValue] = useState(0.001);
  const [pointsGiven,setPointsGiven] = useState(1);
  const [contributions, setContributions] = React.useState([
    {
      text: "This is a great article!",
      isPositive: true,
    },
    {
      text: "This is a terrible article!",
      isPositive: false,
    },
    {
      text: "I don't agree with this part of the article: ...",
      isPositive: false,
    },
    {
      text: "I agree with this part of the article: ...",
      isPositive: true,
    },
  ]);

  function SliderMarkExample() {
    const labelStyles = {
      mt: "2",
      ml: "-2.5",
      fontSize: "sm",
    };

    return (
      <Box className="vote-slider" pt={6} pb={2}>
        <Slider
          defaultValue={0.001}
          min={0.001}
          max={1}
          step={0.001}
          aria-label="slider-ex-6"
          onChange={(val) => {
            setSliderValue(val);
            setPointsGiven(50 * val.toFixed(1) > 0 ?50 * val.toFixed(1) : 1);
          }}
        >
          <SliderMark value={0} {...labelStyles}>
            0.001
          </SliderMark>
          <SliderMark value={1} {...labelStyles}>
            1
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    );
  }

  return (
    <Tabs>
      <TabList>
        <Tab>Article</Tab>
        <Tab>Contributions</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="article">
            <div className="article-title">{articleData && articleData.title}</div>
            <div className="article-description">{articleData && articleData.description}</div>
            <div className="article-body">{articleData && articleData.body}</div>
            <div className="article-author">By Anonymous</div>
            <div className="article-votes">
              {SliderMarkExample()}
              <div className="article-vote-text-and-value">
                <div className="article-vote-text">Amount staked:</div>
                <div className="article-vote-value">{` ${sliderValue} ETH`}</div>
              </div>
              <div className="article-vote-text-and-value">
                <div className="article-vote-text">Points given:</div>
                <div>{pointsGiven}</div>
              </div>
            </div>
            <div className="article-sources">
              {articleData && articleData.sourceUrls.map((sourceUrl, index) => {
                return (
                  <Button
                    onClick={() => window.open(sourceUrl, "_blank")}
                    key={index}
                    size="sm"
                    outlineColor="gray"
                    variant="outline"
                    className="source-article-button"
                  >
                    Source {index + 1}
                  </Button>
                );
              })}
            </div>
            <div className="article-comment-group">
              <h2 className="article-contribution-title">Contribution</h2>
              <div className="article-contribution-switch">
                <div className="article-contribution-switch-name">
                  Is your contribution in favor of this article?
                </div>
                <Switch
                  id="isChecked"
                  onChange={() =>
                    setIsContributionPositive(
                      isContributionPositive ? false : true
                    )
                  }
                  value={isContributionPositive}
                />
              </div>

              <textarea
                onChange={() => setCommentText(event.target.value)}
                className="comment-input-box"
                type="text"
                placeholder="Add a comment..."
              />

              <Button
                isDisabled={commentText === "" || commentText.length > 500}
                onClick={() =>
                  setContributions([
                    ...contributions,
                    { text: commentText, isPositive: isContributionPositive },
                  ])
                }
                colorScheme="green"
                size="sm"
                className="article-submit-comment-button"
              >
                Submit contribution
              </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="contributions-group">
            {contributions.map((contribution, index) => {
              return (
                <div className="contribution" key={index}>
                  <div className="contribution-text">{contribution.text}</div>
                  <div className="contribution-votes">
                    <div className="contribution-vote-metric">
                      <div className="contribution-is-positive">
                        {contribution.isPositive ? (
                          <Badge colorScheme="green">in favor</Badge>
                        ) : (
                          <Badge colorScheme="red">against</Badge>
                        )}
                      </div>
                      <ArrowUpIcon
                        className="contribution-arrow"
                        w={4}
                        h={4}
                        color="green.500"
                      />
                      <div className="contribution-number">100</div>
                      <ArrowDownIcon
                        className="contribution-arrow"
                        w={4}
                        h={4}
                        color="gray.500"
                      />
                      <div className="contribution-number">50</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Article;
